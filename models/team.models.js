import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Team name is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    size: {
      type: Number,
      required: [true, "Team size is required"],
      max: [10, "Team size cannot be more than 10"],
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    hackathon: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hackathon",
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Team = mongoose.model("Team", teamSchema);
