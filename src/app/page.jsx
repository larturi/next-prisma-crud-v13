import TaskCard from '@/components/TaskCard';

async function loadTasks() {
   const res = await fetch(`${process.env.API_URL}/api/tasks`, {
      cache: 'no-store',
   });

   const tasks = await res.json();
   return tasks;
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
