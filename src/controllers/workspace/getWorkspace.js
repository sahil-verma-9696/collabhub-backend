import Workspace from "../../models/workspace.model.js";

const getWorkspace = async(req,res)=>{
    const {_id} = req.user;

  

    const getYourWorkspace = await Workspace.find({
      owner: req.user._id
    })
      .sort({ createdAt: -1 })
    .lean();

    res.status(200).json({message:"Here is user workspaces", data: getYourWorkspace})


}

export default getWorkspace;