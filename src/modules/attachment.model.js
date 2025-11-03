import mongoose from "mongoose";

const AttachmentSchema = new mongoose.Schema({
  // The task this attachment belongs to
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: false // optional: can be attached to comment or document instead
  },

  // Optional: attached to a comment instead of a task
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: false
  },

  // Optional: attached to a document (e.g. generated PPT)
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: false
  },

  // File URL in cloud storage (S3, Cloudinary, Firebase etc.)
  fileUrl: {
    type: String,
    required: [true, 'File URL is required'],
    trim: true
  },

  // File name (for user display)
  fileName: {
    type: String,
    required: [true, 'File name is required']
  },

  // MIME type: image/png, application/pdf, etc.
  fileType: {
    type: String,
    required: [true, 'File type is required'],
    match: [
      /^.*\/.*$/, 
      'File type should be a valid MIME type (e.g., image/png)'
    ]
  },

  // Optional: file size in bytes
  fileSize: {
    type: Number,
    min: [0, 'File size cannot be negative']
  },

  // Who uploaded this file
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // adds createdAt and updatedAt fields automatically
});

// Index for faster queries on task or comment
AttachmentSchema.index({ task: 1 });
AttachmentSchema.index({ comment: 1 });

export default mongoose.model('Attachment', AttachmentSchema);

