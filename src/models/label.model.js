import mongoose from "mongoose";

const LabelSchema = new mongoose.Schema({
  // Name of the label/tag
  name: {
    type: String,
    required: [true, 'Label name is required'],
    trim: true,
    maxlength: [50, 'Label name must be under 50 characters']
  },

  // Color for the label (hex code)
  colorCode: {
    type: String,
    required: true,
    match: [/^#([0-9a-fA-F]{6})$/, 'Color must be a valid hex code']
  },

  // Optional description to explain the label
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description must be under 200 characters']
  },

  // Team that the label belongs to
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },

  // Who created this label (optional but helpful)
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, {
  timestamps: true // createdAt, updatedAt
});

// Add unique constraint per team (same label can't exist twice in same team)
LabelSchema.index({ name: 1, team: 1 }, { unique: true });

export default mongoose.model('Label', LabelSchema);
