import Module from "../../models/module.model.js";
import Workspace from "../../models/workspace.model.js";

const createModule = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { _id } = req.params; // workspace id
    const userId = req.user.id; // from protect middleware (JWT auth)

    if (!name?.trim()) {
      return res.status(400).json({ message: "Module name is required." });
    }

    if (!_id) {
      return res.status(400).json({ message: "Workspace ID is required." });
    }

    // ✅ FIX: use findById instead of find
    const workspace = await Workspace.findById(_id);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found." });
    }

    // ✅ check if logged-in user is the owner
    if (workspace.owner.toString() !== userId) {
      return res.status(403).json({ message: "You are not allowed to create modules in this workspace." });
    }

    // Create module
    const module = await Module.create({
      name: name.trim(),
      description: description?.trim() || "",
      workspace: _id,
    });

    return res.status(201).json({
      message: "Module created successfully",
      data: module,
    });
  } catch (error) {
    console.error("Error creating module:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default createModule;
