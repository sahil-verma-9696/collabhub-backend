import crypto from "crypto";

export class Team {
  constructor({ name, workspace }) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.workspaceId = workspace?.id || null;
    this.workspace = workspace || null;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    // Relationships
    this.members = [];
  }

  async addMember(user) {
    const exists = this.members.some((member) => member.id === user.id);
    if (!exists) {
      this.members.push(user);
      this.updatedAt = new Date();
    }
  }

  async removeMember(userId) {
    const initialLength = this.members.length;
    this.members = this.members.filter((member) => member.id !== userId);
    if (this.members.length !== initialLength) {
      this.updatedAt = new Date();
    }
  }

  async listMembers() {
    return this.members;
  }
}

export default Team;
