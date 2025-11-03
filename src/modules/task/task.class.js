import crypto from "crypto";

export default class Task {
  constructor({
    workspaceId,
    title,
    description,
    creator,
    dueDate,
    priority = "medium",
  }) {
    this.id = crypto.randomUUID();
    this.workspaceId = workspaceId;
    this.title = title;
    this.description = description;
    this.status = "todo";
    this.priority = priority;
    this.dueDate = dueDate || null;

    this.creator = creator;
    this.editor = creator;
    this.assignees = [];

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async assignUser(user) {
    const exists = this.assignees.some((assignee) => assignee.id === user.id);
    if (!exists) {
      this.assignees.push(user);
      this.updatedAt = new Date();
    }
  }

  async unassignUser(userId) {
    this.assignees = this.assignees.filter((user) => user.id !== userId);
    this.updatedAt = new Date();
  }

  async updateStatus(status) {
    const validStatuses = ["todo", "in-progress", "done"];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status: ${status}`);
    }
    this.status = status;
    this.updatedAt = new Date();
  }

  async updatePriority(priority) {
    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(priority)) {
      throw new Error(`Invalid priority: ${priority}`);
    }
    this.priority = priority;
    this.updatedAt = new Date();
  }
}
