import Task from '../../models/task.model.js';


const createTaskById = async(req , res)=>{
    
    const {title , description ,status , label , date} = req.body;
    const {module_id } = req.params;

    if(!title){
        const err = new Error("Title is required");
        err.statusCode = 401;
        throw err;
    }

    const newTask = await Task.create({
        title,
        description,
        status,
        label,
        date,
        module:module_id
    })

    await newTask.save();
    res.status(201).json({message:"Your Task is Created Succesfully", data :newTask});


}

export default createTaskById;