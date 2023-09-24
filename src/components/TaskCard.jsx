"use client"

import { useRouter } from 'next/navigation'

function TaskCard({task}) {

  const router = useRouter()

  return (
    <div 
        key={task.id} 
        onClick={() => router.push(`/task/edit/${task.id}`)}
        className="bg-gray-800 p-3 hover:cursor-pointer hover:bg-slate-900"
    >
        <h3 className="font-bold text-xl mb-3">{task.title}</h3>
        <p className="min-h-[40px]">{task.description}</p>
        <p className="text-sm text-gray-400 mt-1 float-right">
            {new Date(task.createdAt).toLocaleDateString()}
        </p>
    </div>
  )
}

export default TaskCard