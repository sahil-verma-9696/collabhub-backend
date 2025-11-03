import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  // User who will receive the notification
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Message to be displayed (short and user-friendly)
  message: {
    type: String,
    required: [true, 'Notification message is required'],
    trim: true
  },

  // Optional detailed message or description
  details: {
    type: String,
    trim: true
  },

  // Notification type (to distinguish types in frontend)
  type: {
    type: String,
    enum: [
      'task_assigned',
      'comment_added',
      'task_updated',
      'message_received',
      'team_invite',
      'document_uploaded',
      'mention',
      'custom'
    ],
    default: 'custom'
  },

  // Whether the notification has been read
  isRead: {
    type: Boolean,
    default: false
  },

  // Optional link to navigate on click (e.g., `/task/123`)
  link: {
    type: String,
    trim: true
  },

  // Reference to related entity (optional and dynamic)
  relatedTask: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },

  relatedComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },

  relatedMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },

  relatedDocument: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }

}, {
  timestamps: true // adds createdAt and updatedAt
});

// Indexing for efficient query
NotificationSchema.index({ user: 1, isRead: 1 });

export default mongoose.model('Notification', NotificationSchema);
