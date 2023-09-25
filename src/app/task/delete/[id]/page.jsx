import FormTask from "@/components/FormTask"

function DeleteTaskPage({params}) {
  return (
    <div className="h-screen flex justify-center items-center">
      <FormTask params={params}/>
    </div>
  )
}

export default DeleteTaskPage