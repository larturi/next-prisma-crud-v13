"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function FormTask({params}) {

   const router = useRouter()
   const [idTask, setIdTask] = useState('')
   const [title, setTitle] = useState('')
   const [description, setDescription] = useState('')
   const [isEdit, setIsEdit] = useState(false)

   useEffect(() => {
      const getTaskById = async () => {
         const res = await fetch(`/api/tasks/${idTask}`)
         const task = await res.json()
         setTitle(task.title)
         setDescription(task.description)
      }

      if(idTask) {
         getTaskById()
      }
   }, [idTask])

   useEffect(() => {
      if(params?.id) {
         setIdTask(params.id)
         setIsEdit(true)
      }
   }, [params.id])


   const onSubmit = async (e) => {
      e.preventDefault()

      const title = e.target.title.value
      const description = e.target.description.value

      if (title === '') return

      if (!isEdit) {
         try {
            await fetch('/api/tasks/', {
                method: 'POST',
                body: JSON.stringify({ title, description }),
                headers: {
                   'Content-Type': 'application/json',
                },
             })
    
          } catch (error) {
            console.error(error.message)
          }
      } else {
         try {
            await fetch(`/api/tasks/${idTask}`, {
                method: 'PUT',
                body: JSON.stringify({ title, description }),
                headers: {
                   'Content-Type': 'application/json',
                },
             })
    
          } catch (error) {
            console.error(error.message)
          }
      }
      router.refresh()
      router.push('/')
   }

   return (
      <form onSubmit={onSubmit} className='bg-slate-800 p-10'>
         <h1 className='text-3xl font-bold mb-7'>
            { isEdit ? 'Editar Tarea' : 'Nueva Tarea'}
         </h1>

         <label htmlFor='title' className='text-sm font-bold'>
            Titulo
         </label>
         <input
            id='title'
            type='text'
            value={ title }
            onChange={(e) => setTitle(e.target.value)}
            className='border border-gray-400 p-2 mb-4 w-full text-black'
         />

         <label htmlFor='description' className='text-sm font-bold'>
            Descripción
         </label>
         <textarea
            id='description'
            rows='3'
            className='border border-gray-400 p-2 mb-4 w-full text-black'
            value={ description }
            onChange={(e) => setDescription(e.target.value)}
         ></textarea>

         <button className='bg-blue-500 w-full hover:bg-blue-700 text-white py-2 px-4'>
            { isEdit ? 'EDITAR' : 'GUARDAR'}
         </button>
      </form>
   )
}

export default FormTask
