import Workspace from "../../models/workspace.model.js";
async function createWorkspaceById(req, res) {
  const { name, des } = req.body;

  if (!name && !description) {
    const err = new Error("name and password is required");
    err.status = 401;
    throw err;
  }

  const workspace = await Workspace.create({
    name,
    description: des,
    owner: req.user._id,
  });

  await workspace.save();
  res.status(201).json({message:"workspace created successfully",data:workspace})
}

export default createWorkspaceById;
