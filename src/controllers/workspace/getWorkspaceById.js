import Workspace from "../../models/workspace.model.js";

const getWorkspaceById = async(req,res)=>{
    const {id} = req.params;

    if(!id){
        const err = new Error("Your id is required");
        err.statusCode = 401;
        throw err;
    }

    const workspaceById = await Workspace.find({
      _id: id, owner: req.user._id 
    })

  if (!workspaceById) {
    return res.status(404).json({ message: "Workspace not found",data:[]});
  }



    res.status(200).json({message:"Here is your workspaces", data:workspaceById})
}

export default getWorkspaceById;