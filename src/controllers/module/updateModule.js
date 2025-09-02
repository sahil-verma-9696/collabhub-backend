import Module from "../../models/module.model.js";

const updateModule = async(req , res) =>{
   const {module_id } = req.params;


   if(!module_id){
    const err = new Error("Module id is required");
    err.statusCode = 401;
    throw err;
   }

   const updateYourModule = await Module.findOneAndUpdate({
    Module :module_id
   })

   res.status(200).json({message:"Your module is update successfully ",data:updateYourModule})
}

export default updateModule;