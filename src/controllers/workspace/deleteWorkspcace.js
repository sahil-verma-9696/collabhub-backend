import Workspace from "../../models/workspace.model.js";


const deleteWorkspace = async (req, res) => {
  const { id } = req.params;

  // Find workspace and soft-delete
  const deletedWorkspace = await Workspace.findOneAndUpdate(
    { _id: id, owner: req.user._id, status: "active" },
    { $set: { status: "deleted" } },
    { new: true }
  );

  if (!deletedWorkspace) {
    return res
      .status(404)
      .json({ message: "Workspace not found " });
  }

  res.status(200).json({
    message: "Workspace deleted successfully ",
    data: deletedWorkspace,
  });
};

export default deleteWorkspace;
