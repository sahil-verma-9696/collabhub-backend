import Workspace from "../../models/workspace.model.js";
const createWorkSpace = async (req, res) => {

   if(!req.body){
    const err = new Error("Workspace name is required.");
    err.statusCode = 401;
    throw err;
  }
  const { name, description } = req.body;

 

  if (!name?.trim()) {
    const err = new Error("Your name is required");
    err.statusCode = 401;
    throw err;
  }

  const workSpace = await Workspace.create({
    name: name.trim(),
    description: description?.trim(),
    owner: req.user._id,
  });

  await workSpace.save();
  res
    .status(201)
    .json({
      message: "Your Workspace is created succesfully",
      data: workSpace,
    });
};

export default createWorkSpace;
