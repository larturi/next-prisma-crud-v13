import TaskCard from '@/components/TaskCard';
import axios from 'axios';

async function loadTasks() {
   try {
      const res = await axios.get(`${process.env.API_URL}/api/tasks`, {
         headers: {
            'Cache-Control': 'no-store',
         },
      });

      return res.data;
   } catch (error) {
      console.error('Error al cargar las tareas:', error);
      throw error;
   }
}

async function HomePage() {
   const tasks = await loadTasks();
   return (
      <>
         <h1 className='ml-5 mt-7 text-3xl'>Tareas</h1>
         <div className='grid grid-cols-3 gap-3 p-5'>
            {tasks.map((task) => (
               <TaskCard key={task.id} task={task} />
            ))}
         </div>
      </>
   );
}

export default HomePage;
