import Module from "../../models/module.model.js";

const getModule = async(req , res) => {
   const {workspace_id , module_id } = req.params;


   if(!workspace_id){
    const err = new Error("Your workspace id is required");
    err.statusCode  = 400;
    throw err;
   }

   const getAllModules = await Module.find({     
      Workspace :workspace_id 
   })

   
   res.statusCode(201).json({message:"Your module is created successfully", data:getAllModules})
}

export default getModule;