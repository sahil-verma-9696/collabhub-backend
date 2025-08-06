import mongoose from "mongoose";

const AttachmentSchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  fileUrl: String,
  fileType: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploadedAt: { type: Date, default: Date.now }
});

export default  mongoose.model('Attachment', AttachmentSchema);
