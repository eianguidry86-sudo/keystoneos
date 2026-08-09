
'use client'

import type { Task, Business } from '@/types'

interface TasksClientProps {
  tasks: Task[]
  businesses: Business[]
}

export function TasksClient({ tasks, businesses }: TasksClientProps) {
  return (
    <>
      

<header className="flex justify-between items-center px-lg w-full h-16 shrink-0 bg-surface-dim/50 backdrop-blur-md border-b border-white/5 z-40">
<div className="flex items-center gap-md">
<button className="md:hidden text-primary p-2 rounded-full hover:bg-white/5 transition-colors">
<span className="material-symbols-outlined">menu</span>
</button>
<div className="flex items-center gap-sm">

<div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center border border-primary/30">
<div className="w-3 h-3 bg-primary rounded-sm"></div>
</div>
<h1 className="font-headline-md text-headline-md font-bold text-on-surface">Kanban Board: Product Roadmap</h1>
</div>
</div>
<div className="flex items-center gap-md">

<div className="hidden lg:flex items-center bg-surface-container-high rounded-full px-4 py-1.5 border border-white/5 focus-within:border-primary/50 focus-within:shadow-[inset_0_0_8px_rgba(99,102,241,0.1)] transition-all">
<input className="bg-transparent border-none text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0 w-48 outline-none" placeholder="Search tasks..." type="text"/ />
<span className="material-symbols-outlined text-on-surface-variant/70 text-sm">search</span>
</div>
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-white/5 rounded-full">
<span className="material-symbols-outlined">settings</span>
</button>
<button className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
<img className="w-full h-full object-cover" data-alt="A small, circular avatar image of a user profile. It shows a clear, modern headshot of a professional against a dark, minimalist background, matching the overall sleek and premium aesthetic of the application interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkesH4fqAhLGfztS2Cl_WLzSv7tgJZVMct8RyitvpKYoyG3FcQFaYsBZJdhPRQ_ePT9MbJ9NLyZq3HYX6TYc3mu1xgAJUGkVm73tQtoEtNtvxEQexcCAE5WeIWWXdvib7_u0Q6dFeCZVZkDlH5iGZT-LiV2HpB4e7cNY9lPTSyKxiwZSAnhuAfMAjeIlvJAnoz2RYz9P_ttFRmyhyqZ2d19pa_HkE3nPMAbPmSk-c47TTELQ0OQwKK"/ />
</button>
</div>
</header>

<div className="flex-1 overflow-x-auto p-lg pt-xl flex gap-gutter">

<div className="glass-panel rounded-xl flex flex-col w-[340px] shrink-0 max-h-full">

<div className="p-md flex items-center justify-between border-b border-white/5">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20">
<span className="material-symbols-outlined text-lg" data-weight="fill" style="font-variation-settings: 'FILL' 1;">list_alt</span>
</div>
<h2 className="font-headline-md text-[18px] font-semibold text-on-surface">To Do</h2>
<span className="font-label-sm text-label-sm text-on-surface-variant bg-white/5 px-2 py-1 rounded-md">12</span>
</div>
<button className="text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined">more_horiz</span>
</button>
</div>

<div className="px-md py-sm">
<button className="w-full py-2 flex items-center justify-center gap-sm rounded-lg border border-white/5 text-on-surface-variant font-body-md text-body-md hover:border-primary/30 hover:text-primary hover:bg-white/5 transition-all">
<span className="material-symbols-outlined text-sm">add</span>
                        Add Task
                    </button>
</div>

<div className="flex-1 overflow-y-auto kanban-col-scroll p-md flex flex-col gap-sm pt-0">

<div className="kanban-card rounded-lg p-md cursor-pointer flex flex-col gap-sm">
<div className="flex justify-between items-start">
<h3 className="font-body-lg text-body-lg font-semibold text-on-surface leading-tight">Contract Review</h3>
<button className="text-on-surface-variant/50 hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-sm">more_horiz</span></button>
</div>
<div className="flex items-center gap-xs mt-1">
<span className="font-label-sm text-label-sm text-[#f59e0b] bg-[#f59e0b]/10 border border-[#f59e0b]/30 px-2 py-0.5 rounded">Legal</span>
</div>
<div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-on-surface-variant/70 font-label-md text-label-md">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">format_list_bulleted</span>
<span>3 subtasks</span>
</div>
<div className="flex items-center gap-3">
<span className="text-xs">Due Jul 20</span>
<div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">chat_bubble_outline</span> 2</div>
</div>
</div>
</div>

<div className="kanban-card active-focus rounded-lg p-md cursor-pointer flex flex-col gap-sm">
<div className="flex justify-between items-start">
<h3 className="font-body-lg text-body-lg font-semibold text-on-surface leading-tight">UX Design Mockups</h3>
<button className="text-on-surface-variant/50 hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-sm">more_horiz</span></button>
</div>
<div className="flex items-center gap-xs mt-1">
<span className="font-label-sm text-label-sm text-secondary bg-secondary/10 border border-secondary/30 px-2 py-0.5 rounded">Tech</span>
</div>
<div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-on-surface-variant/70 font-label-md text-label-md">
<div className="flex items-center gap-3">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">format_list_bulleted</span>
<span>3 subtasks</span>
</div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">desktop_windows</span>
<span>5/12</span>
</div>
</div>
<div className="flex items-center gap-3">
<span className="text-xs">Due Jul 22</span>
<div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">chat_bubble_outline</span> 4</div>
</div>
</div>
</div>
</div>
</div>

<div className="glass-panel rounded-xl flex flex-col w-[340px] shrink-0 max-h-full">

<div className="p-md flex items-center justify-between border-b border-white/5">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
<span className="material-symbols-outlined text-lg" data-weight="fill" style="font-variation-settings: 'FILL' 1;">schedule</span>
</div>
<h2 className="font-headline-md text-[18px] font-semibold text-on-surface">In Progress</h2>
</div>
<button className="text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined">more_horiz</span>
</button>
</div>

<div className="px-md py-sm">
<button className="w-full py-2 flex items-center justify-center gap-sm rounded-lg border border-white/5 text-on-surface-variant font-body-md text-body-md hover:border-primary/30 hover:text-primary hover:bg-white/5 transition-all">
<span className="material-symbols-outlined text-sm">add</span>
                        Add Task
                    </button>
</div>

<div className="flex-1 overflow-y-auto kanban-col-scroll p-md flex flex-col gap-sm pt-0">

<div className="kanban-card rounded-lg p-md cursor-pointer flex flex-col gap-sm">
<div className="flex justify-between items-start">
<h3 className="font-body-lg text-body-lg font-semibold text-on-surface leading-tight">API Integration</h3>
<button className="text-on-surface-variant/50 hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-sm">more_horiz</span></button>
</div>
<div className="flex items-center gap-xs mt-1">
<span className="font-label-sm text-label-sm text-secondary bg-secondary/10 border border-secondary/30 px-2 py-0.5 rounded">Tech</span>
</div>
<div className="flex items-center gap-2 mt-2">
<div className="w-6 h-6 rounded-full overflow-hidden border border-white/20">
<img className="w-full h-full object-cover" data-alt="A miniature portrait of a software developer, face clearly visible, stylized for a dark mode interface avatar. Deep rich colors, obsidian background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD-L6mH-b0oTPaw1DaYjaOIBPlAYXAhrJbNK-FGcqnaluO1QmIK9A9RTpYomaTFeUo4hJP_FU3Z7DsMIUJZICIiyY7KfWZWyNHII37a_FJUpInMS6moQgxzZ8ftbZIDvNw-_ssbYGrJ17LIgv4D76767XjPhyHz4-R5oHX0EtyBYNTfGCLpJhuBpFFV3XPZ3yIjuvWE8M6QjBjIQ8X9jajAjTnynJzPDAf2T4gywhh4zxvmjwFKJLy"/ />
</div>
<span className="font-label-md text-label-md text-on-surface-variant">Lead: Mark</span>
</div>
<div className="flex items-center gap-2 mt-2">
<div className="pulse-dot"></div>
<span className="font-label-md text-label-md text-error">High Priority</span>
</div>
<div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5 text-on-surface-variant/70 font-label-md text-label-md">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">desktop_windows</span>
<span>9/15</span>
</div>
<div className="flex items-center gap-3">
<span className="text-xs">Due Jul 18</span>
</div>
</div>
</div>

<div className="kanban-card rounded-lg p-md cursor-pointer flex flex-col gap-sm">
<div className="flex justify-between items-start">
<h3 className="font-body-lg text-body-lg font-semibold text-on-surface leading-tight">Onboarding Flow</h3>
<button className="text-on-surface-variant/50 hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-sm">more_horiz</span></button>
</div>
<div className="flex items-center gap-xs mt-1">
<span className="font-label-sm text-label-sm text-tertiary bg-tertiary/10 border border-tertiary/30 px-2 py-0.5 rounded">Curriculum</span>
</div>
<div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-on-surface-variant/70 font-label-md text-label-md">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">menu_book</span>
<span>4/5</span>
</div>
<div className="flex items-center gap-3">
<span className="text-xs">Due Jul 19</span>
<div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">chat_bubble_outline</span> 3</div>
</div>
</div>
</div>
</div>
</div>

<div className="glass-panel rounded-xl flex flex-col w-[340px] shrink-0 max-h-full opacity-80">

<div className="p-md flex items-center justify-between border-b border-white/5">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-lg bg-secondary-container/20 text-secondary-container flex items-center justify-center border border-secondary-container/30">
<span className="material-symbols-outlined text-lg" data-weight="fill" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
<h2 className="font-headline-md text-[18px] font-semibold text-on-surface">Completed</h2>
</div>
<button className="text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined">more_horiz</span>
</button>
</div>

<div className="px-md py-sm">
<button className="w-full py-2 flex items-center justify-center gap-sm rounded-lg border border-white/5 text-on-surface-variant font-body-md text-body-md hover:border-primary/30 hover:text-primary hover:bg-white/5 transition-all">
<span className="material-symbols-outlined text-sm">add</span>
                        Add Task
                    </button>
</div>

<div className="flex-1 overflow-y-auto kanban-col-scroll p-md flex flex-col gap-sm pt-0">

<div className="kanban-card rounded-lg p-md cursor-pointer flex flex-col gap-sm">
<div className="flex justify-between items-start">
<h3 className="font-body-lg text-body-lg font-semibold text-on-surface/70 line-through decoration-white/20 leading-tight">Client Feedback</h3>
<button className="text-on-surface-variant/50 hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-sm">more_horiz</span></button>
</div>
<div className="flex items-center gap-xs mt-1">
<span className="font-label-sm text-label-sm text-[#f59e0b]/70 bg-[#f59e0b]/5 border border-[#f59e0b]/20 px-2 py-0.5 rounded">Legal</span>
</div>
<div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-on-surface-variant/50 font-label-md text-label-md">
<div className="flex items-center gap-1 text-secondary">
<span className="material-symbols-outlined text-[14px]">check_circle</span>
<span>Jul 15</span>
</div>
<div className="flex items-center gap-3">
<div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">chat_bubble_outline</span> 9</div>
</div>
</div>
</div>
</div>
</div>

<div className="w-4 shrink-0"></div>
</div>

    </>
  )
}
