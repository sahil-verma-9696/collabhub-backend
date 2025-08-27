import Task from '../../models/task.model.js';
const updateTaskById = async(req,res)=>{
   const {task_id} = req.params;


   if(!task_id){
      const err = new Error("Id is required");
      err.statusCode(201);
      throw err;
   }

   const updateTask = await Task.updateMany({
       task : task_id
   })

   await updateTask.save();
   res.statusCode(401).json({message:"Your Task is Updated Succesfully", data: updateTask})
}

export default updateTaskById;