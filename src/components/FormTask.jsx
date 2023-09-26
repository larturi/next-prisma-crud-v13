'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';

export function FormTask({ params }) {
   const router = useRouter();
   const pathname = usePathname();

   const [idTask, setIdTask] = useState('');
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [isEdit, setIsEdit] = useState(false);
   const [isDelete, setIsDelete] = useState(false);

   useEffect(() => {
      const getTaskById = async () => {
         const res = await axios.get(`/api/tasks/${idTask}`);
         const task = await res.data;
         setTitle(task.title);
         setDescription(task.description);
      };

      if (idTask) {
         getTaskById();
      }
   }, [idTask]);

   useEffect(() => {
      if (pathname?.includes('edit')) {
         setIdTask(params.id);
         setIsEdit(true);
      }

      if (pathname?.includes('delete')) {
         setIdTask(params.id);
         setIsDelete(true);
      }
   }, [params, pathname]);

   const onSubmit = async (e) => {
      e.preventDefault();

      const title = e.target.title.value;
      const description = e.target.description.value;

      if (title === '') return;

      if (isEdit) {
         try {
            await axios.put(
               `/api/tasks/${idTask}`,
               {
                  title,
                  description,
               },
               {
                  headers: {
                     'Content-Type': 'application/json',
                  },
               }
            );
         } catch (error) {
            console.error(error.message);
         }
      } else if (isDelete) {
         try {
            await axios.delete(`/api/tasks/${idTask}`);
         } catch (error) {
            console.error(error.message);
         }
      } else {
         try {
            await axios.post(
               '/api/tasks/',
               {
                  title,
                  description,
               },
               {
                  headers: {
                     'Content-Type': 'application/json',
                  },
               }
            );
         } catch (error) {
            console.error(error.message);
         }
      }

      router.refresh();
      router.push('/');
   };

   return (
      <form
         onSubmit={onSubmit}
         className={isDelete ? 'bg-slate-700 p-10' : 'bg-slate-800 p-10'}
      >
         <h1 className='text-3xl font-bold mb-7'>
            {isEdit
               ? 'Editar Tarea'
               : isDelete
               ? 'Eliminar Tarea'
               : 'Nueva Tarea'}
         </h1>

         <label htmlFor='title' className='text-sm font-bold'>
            Titulo
         </label>
         <input
            id='title'
            type='text'
            value={title}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
         ></textarea>

         <button
            className={
               isDelete
                  ? 'bg-red-600 w-full hover:bg-red-800 text-white py-2 px-4'
                  : 'bg-blue-700 w-full hover:bg-blue-700 text-white py-2 px-4'
            }
         >
            {isEdit ? 'Editar' : isDelete ? 'Eliminar' : 'Guardar'}
         </button>
      </form>
   );
}

export default FormTask;
