import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hackathon name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      default: "Upcoming",
    },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
    organizer: {
      type: String,
      required: [true, "Organizer is required"],
      trim: true,
    },
    isInternal: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

export const Hackathon = mongoose.model("Hackathon", hackathonSchema);
