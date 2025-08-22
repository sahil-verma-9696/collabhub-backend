import Task from "../../models/task.model.js";

const deleteTaskById = async(req , res) =>{
  const {task_id } = req.params;

  if(!task_id){
    const err = new Error("Id is required");
    err.statusCode = 401;
    throw err;
  }

  const deleteTask = await Task.delete({
    task : task_id
  })

  await deleteTask.save();
  res.status(201).json({message:"Your Task is Deleted Succesfully", data : deleteTask});
}
export default deleteTaskById;