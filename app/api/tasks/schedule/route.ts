export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { Task } from '@/types'

export async function POST(request: Request) {
  const supabase = createServerClient()
  
  // Get business_id from request body
  const body = await request.json()
  const { business_id } = body

  if (!business_id) {
    return NextResponse.json({ error: 'business_id is required' }, { status: 400 })
  }

  // Fetch uncompleted tasks for the business
  const { data: tasks, error: fetchError } = await supabase
    .from('tasks')
    .select('*')
    .eq('business_id', business_id)
    .neq('status', 'completed')
    .neq('status', 'archived')
    .order('priority', { ascending: false }) // Simple sort for now

  if (fetchError || !tasks) {
    return NextResponse.json({ error: fetchError?.message || 'No tasks found' }, { status: 500 })
  }

  // Simulate sequential scheduling
  // Start scheduling from the next hour
  let currentTime = new Date()
  currentTime.setMinutes(0, 0, 0)
  currentTime.setHours(currentTime.getHours() + 1)

  const updates = tasks.map((task: any) => {
    const durationMins = task.estimated_duration_mins || 60
    
    // Skip to next day if it's past 5 PM (basic working hours logic)
    if (currentTime.getHours() >= 17) {
      currentTime.setDate(currentTime.getDate() + 1)
      currentTime.setHours(9, 0, 0, 0)
    }

    const scheduledStart = new Date(currentTime)
    currentTime.setMinutes(currentTime.getMinutes() + durationMins)
    const scheduledEnd = new Date(currentTime)

    return {
      id: task.id,
      scheduled_start: scheduledStart.toISOString(),
      scheduled_end: scheduledEnd.toISOString()
    }
  })

  // Update tasks in Supabase (upsert)
  const { error: updateError } = await supabase
    .from('tasks')
    .upsert(updates)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ 
    message: 'Tasks successfully scheduled',
    scheduled_count: updates.length,
    tasks: updates
  })
}

