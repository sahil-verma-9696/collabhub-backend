import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  // Reference to the task this comment is associated with
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },

  // Author of the comment
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Main content of the comment
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true,
    maxlength: [1000, 'Comment is too long (max 1000 characters)']
  },

  // Optional parent comment (for threaded replies)
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },

  // Array of file attachments (if you want to show images or documents in comments)
  attachments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attachment'
  }],

  // Like or reactions count (you can build reaction table separately)
  likes: {
    type: Number,
    default: 0
  },

  // Whether comment is edited
  edited: {
    type: Boolean,
    default: false
  },

  // Auto-managed timestamps
}, {
  timestamps: true // adds createdAt and updatedAt
});

// Indexes for fast queries
CommentSchema.index({ task: 1 });
CommentSchema.index({ user: 1 });
CommentSchema.index({ parentComment: 1 });

export default mongoose.model('Comment', CommentSchema);
