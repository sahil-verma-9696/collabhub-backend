import crypto from "crypto";

export default class Conversation {
  constructor({ workspaceId, title, admin }) {
    this.id = crypto.randomUUID();
    this.workspaceId = workspaceId;
    this.title = title;
    this.admin = admin;

    this.participants = [admin];
    this.messages = [];

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async addParticipant(user) {
    const exists = this.participants.some((p) => p.id === user.id);
    if (!exists) {
      this.participants.push(user);
      this.updatedAt = new Date();
    }
  }

  async removeParticipant(userId) {
    this.participants = this.participants.filter((p) => p.id !== userId);
    this.updatedAt = new Date();
  }

  async sendMessage(sender, content) {
    if (!this.participants.some((p) => p.id === sender.id)) {
      throw new Error("User is not a participant in this conversation.");
    }

    const message = {
      id: crypto.randomUUID(),
      sender,
      content,
      sentAt: new Date(),
    };

    this.messages.push(message);
    this.updatedAt = new Date();

    return message;
  }

  async getMessages(limit = 50) {
    return this.messages.slice(-limit);
  }
}
