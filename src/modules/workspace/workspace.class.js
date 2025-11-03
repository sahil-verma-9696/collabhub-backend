import crypto from "crypto";

export class Workspace {
  constructor({ name, owner }) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.ownerId = owner?.id || null;
    this.owner = owner || null;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    // Relationships
    this.teams = [];
    this.pages = [];
    this.tasks = [];
    this.conversations = [];
  }

  async addTeam(team) {
    this.teams.push(team);
    this.updatedAt = new Date();
  }

  async addPage(page) {
    this.pages.push(page);
    this.updatedAt = new Date();
  }

  async addTask(task) {
    this.tasks.push(task);
    this.updatedAt = new Date();
  }

  async addConversation(conversation) {
    this.conversations.push(conversation);
    this.updatedAt = new Date();
  }

  async getMembers() {
    const members = new Set();
    // collect members from teams
    for (const team of this.teams) {
      if (Array.isArray(team.members)) {
        team.members.forEach((member) => members.add(member));
      }
    }
    // include owner
    if (this.owner) members.add(this.owner);
    return Array.from(members);
  }

  async getAllPages() {
    return this.pages;
  }

  async getAllTasks() {
    return this.tasks;
  }
}

export default Workspace;
