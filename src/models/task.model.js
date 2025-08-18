import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: [2, "Task title must be at least 2 characters long"],
      maxlength: [200, "Task title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: "",
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: [true, "Task must belong to a module"],
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // can be unassigned
    },
    status: {
      type: String,
      enum: ["todo", "in_progress", "review", "completed", "blocked"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    dueDate: {
      type: Date,
      default: null,
    },
    attachments: [
      {
        fileUrl: {
          type: String,
          trim: true,
        },
        fileName: {
          type: String,
          trim: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        message: {
          type: String,
          required: true,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

// Index for faster module-based queries
taskSchema.index({ module: 1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;
