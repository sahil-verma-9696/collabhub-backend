import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Team name is required"],
      trim: true,
      minlength: [2, "Team name must be at least 2 characters long"],
      maxlength: [100, "Team name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: [true, "Team must belong to a workspace"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Team owner is required"],
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["team_lead", "member", "viewer"],
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

// Index for faster lookups by workspace
teamSchema.index({ workspace: 1 });

const Team = mongoose.model("Team", teamSchema);

export default Team;
