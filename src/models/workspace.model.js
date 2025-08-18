import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Workspace name is required"],
      trim: true,
      minlength: [2, "Workspace name must be at least 2 characters long"],
      maxlength: [100, "Workspace name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Workspace owner is required"],
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["admin", "member", "viewer"],
          default: "member",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "archived", "deleted"],
      default: "active",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

// Optional index for faster queries by owner
workspaceSchema.index({ owner: 1 });

const Workspace = mongoose.model("Workspace", workspaceSchema);

export default Workspace;
