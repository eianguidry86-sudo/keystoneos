import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = createServerClient()
  
  // Get business_id from URL query params
  const { searchParams } = new URL(request.url)
  const business_id = searchParams.get('business_id')

  if (!business_id) {
    return NextResponse.json({ error: 'business_id is required' }, { status: 400 })
  }

  // Get current user and their preferences
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: prefs } = await supabase
    .from('user_preferences')
    .select('availability_status')
    .eq('user_id', user.id)
    .single()

  const availability = prefs?.availability_status || 'available'

  // Fetch uncompleted tasks
  const { data: tasks, error: fetchError } = await supabase
    .from('tasks')
    .select('*')
    .eq('business_id', business_id)
    .neq('status', 'completed')
    .neq('status', 'archived')

  if (fetchError || !tasks) {
    return NextResponse.json({ error: fetchError?.message || 'No tasks found' }, { status: 500 })
  }

  // Client-side or API-side sorting logic
  // Sort primarily by availability status
  const sortedTasks = tasks.sort((a: any, b: any) => {
    if (availability === 'away') {
      // Deprioritize developer tasks when away
      if (a.task_context === 'developer' && b.task_context !== 'developer') return 1
      if (b.task_context === 'developer' && a.task_context !== 'developer') return -1
      
      // Prioritize admin/mobile_friendly when away
      const isA_mobile = a.task_context === 'admin' || a.task_context === 'mobile_friendly'
      const isB_mobile = b.task_context === 'admin' || b.task_context === 'mobile_friendly'
      
      if (isA_mobile && !isB_mobile) return -1
      if (isB_mobile && !isA_mobile) return 1
    }

    // Fallback to priority sorting (critical > high > medium > low)
    const priorityWeights: Record<string, number> = {
      'critical': 4,
      'high': 3,
      'medium': 2,
      'low': 1
    }
    return (priorityWeights[b.priority] || 0) - (priorityWeights[a.priority] || 0)
  })

  return NextResponse.json({ 
    availability_status: availability,
    tasks: sortedTasks
  })
}
