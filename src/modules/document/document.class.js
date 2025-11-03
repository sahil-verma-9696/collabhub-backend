import crypto from "crypto";

export class Document {
  constructor({ workspaceId, title, content, creator }) {
    this.id = crypto.randomUUID();
    this.workspaceId = workspaceId;
    this.title = title;
    this.content = content;
    this.creator = creator;
    this.editor = creator; // Initially, creator is also the first editor
    this.viewers = [];
    this.history = []; // to store versions of the Document

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async updateContent(newContent, editor) {
    // Save current state before updating
    this.history.push({
      versionId: `v${this.history.length + 1}`,
      content: this.content,
      editedBy: this.editor.id,
      editedAt: new Date(),
    });

    this.content = newContent;
    this.editor = editor;
    this.updatedAt = new Date();
  }

  async addViewer(user) {
    const exists = this.viewers.some((viewer) => viewer.id === user.id);
    if (!exists) {
      this.viewers.push(user);
    }
  }

  async removeViewer(userId) {
    this.viewers = this.viewers.filter((viewer) => viewer.id !== userId);
  }

  async getHistory() {
    return this.history;
  }
}

export default Document;
