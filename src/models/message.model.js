const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  // Sender of the message
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Receiver: can be a user or a team/group chat
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'receiverModel',
    required: true
  },

  // Dynamic model name for receiver (User or Team)
  receiverModel: {
    type: String,
    enum: ['User', 'Team'],
    required: true
  },

  // Message content (text)
  content: {
    type: String,
    trim: true
  },

  // Optional attachment (file, image, etc.)
  attachment: {
    fileUrl: String,
    fileType: String // e.g., 'image/png', 'application/pdf'
  },

  // Optional reference to a previous message (for replies/threads)
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },

  // Delivery status
  status: {
    type: String,
    enum: ['sent', 'delivered', 'seen'],
    default: 'sent'
  },

  // Whether message was deleted by the sender
  isDeleted: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true // Adds createdAt and updatedAt
});

MessageSchema.index({ receiver: 1, createdAt: -1 });

module.exports = mongoose.model('Message', MessageSchema);
