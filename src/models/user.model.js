// models/User.js
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["admin", "member", "guest"],
      default: "member"
    },
    profilePicUrl: {
      type: String
    },
    bio: {
      type: String,
      trim: true
    },
    skills: {
      type: [String], // Example: ["React", "Node.js", "UI Design"]
      default: []
    },
    workspaces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace"
      }
    ],
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema)
