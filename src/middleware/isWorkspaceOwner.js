import Workspace from "../models/workspace.model.js";

async function isWorkspaceOwner(req, res, next) {
  const userId = req.user._id; // Assuming user ID is stored in req.user
  const workspaceId = req.params.workspace_id; // Assuming workspace ID is in route params

  // Logic to check if the user is the owner of the workspace
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    const err = new Error("Workspace not found");
    err.statusCode = 404;
    throw err;
  }
  if (workspace.owner.toString() !== userId) {
    const err = new Error("Forbidden: You are not the owner of this workspace");
    err.statusCode = 403;
    throw err;
  }
  next();
}
//export kiya 
export default isWorkspaceOwner;
