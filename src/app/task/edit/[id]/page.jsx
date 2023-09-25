import FormTask from "@/components/FormTask"

function EditTaskPage({params}) {
  return (
    <div className="h-[calc(100vh-85px)] flex justify-center items-center">
      <FormTask params={params}/>
    </div>
  )
}

export default EditTaskPage