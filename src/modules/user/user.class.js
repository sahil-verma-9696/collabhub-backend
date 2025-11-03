import crypto from "crypto";
import Workspace from "../workspace/workspace.class";

export class User {
  constructor({ name, email, avatarUrl, password }) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.email = email;
    this.password = password; 
    this.avatarUrl = avatarUrl || null;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    // Relationships
    this.workspaces = []; // User's workspaces
    this.teams = []; // User's teams
    this.assignedTasks = []; // Tasks assigned to the user
    this.createdPages = []; // Pages created by the user
    this.editedPages = []; // Pages edited by the user
    this.conversations = []; // User's conversations
  }

  async createWorkspace(name) {
    const workspace = new Workspace(name, this);
    this.workspaces.push(workspace);
    return workspace;
  }

  async joinWorkspace(workspaceId) {
    const workspace = this.workspaces.find((w) => w.id === workspaceId);
    if (!workspace) throw new Error("Workspace not found");
    workspace.members.push(this);
  }

  async joinTeam(teamId) {
    const team = this.teams.find((t) => t.id === teamId);
    if (!team) throw new Error("Team not found");
    team.members.push(this);
  }

  async assignTask(taskId) {
    const task = this.assignedTasks.find((t) => t.id === taskId);
    if (!task) throw new Error("Task not found");
    task.assignee = this;
  }

  async sendMessage(conversationId, content) {
    const conversation = this.conversations.find(
      (c) => c.id === conversationId
    );
    if (!conversation) throw new Error("Conversation not found");

    const message = {
      id: crypto.randomUUID(),
      sender: this,
      content,
      createdAt: new Date(),
    };
    conversation.messages.push(message);
    return message;
  }
}

export default User;
