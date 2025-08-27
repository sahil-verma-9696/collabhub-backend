import Module from "../../models/module.model.js";

const getAllModules = async (req, res) => {
  try {
    const {  _id } = req.params;

    if (!_id) {
      return res.status(400).json({ message: "Workspace ID is required" });
    }

   
    const modules = await Module.find({ workspace: _id });

    res.status(200).json({
      message: "Here are all your modules",
      data: modules,
    });
  } catch (error) {
    console.error("Error fetching modules:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default getAllModules;
