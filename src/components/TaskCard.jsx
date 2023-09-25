"use client"

import { useRouter } from 'next/navigation'

function TaskCard({task}) {

  function handleDelete(e) {
    e.preventDefault()
    console.log(1)
  }

  const router = useRouter()

  return (
    <div 
        key={task.id} 
        className="bg-gray-800 p-3 hover:bg-slate-900"
    >
        <h3 className="font-bold text-xl mb-3">{task.title}</h3>
        <p className="min-h-[40px]">{task.description}</p>
        <p className="text-sm text-gray-400 mt-1 float-right">
            {new Date(task.createdAt).toLocaleDateString()}
        </p>

        <button 
          className='bg-red-600 px-3 rounded mr-2'
          onClick={() => router.push(`/task/delete/${task.id}`)}
        >
          Eliminar
        </button>

        <button 
          className='bg-blue-600 px-3 rounded'        
          onClick={() => router.push(`/task/edit/${task.id}`)}
        >
          Editar
        </button>
    </div>
  )
}

export default TaskCard