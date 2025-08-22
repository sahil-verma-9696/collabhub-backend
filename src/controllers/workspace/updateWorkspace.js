import Workspace from "../../models/workspace.model.js";

const updateWorkspace = async (req, res) => {
   if(!req.body){
    const err = new Error("Workspace name is required.");
    err.statusCode = 401;
    throw err;
  }

  const { name, description } = req.body;
  const { id } = req.params;

 
  const updatedWorkspace = await Workspace.findOneAndUpdate(
    { _id: id, owner: req.user._id },
    { $set: { ...(name && { name }), ...(description && { description }) } },
    { new: true, runValidators: true }
  );

  if (!updatedWorkspace) {
    const err = new Error("Workspace not found or unauthorized");
    err.statusCode = 401;
    throw err;
  }

  res.status(200).json({
    message: "Workspace updated successfully",
    data: updatedWorkspace,
  });
};


export default updateWorkspace;