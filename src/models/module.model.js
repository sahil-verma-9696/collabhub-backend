import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Module name is required"],
      trim: true,
      minlength: [2, "Module name must be at least 2 characters long"],
      maxlength: [100, "Module name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },
    Workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Module must belong to a project"],
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // module can be unassigned initially
    },
    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed", "blocked"],
      default: "not_started",
    },
    dueDate: {
      type: Date,
      default: null,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

// Index for faster querying by project
moduleSchema.index({ project: 1 });

const Module = mongoose.model("Module", moduleSchema);

export default Module;
