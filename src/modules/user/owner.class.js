import { User } from "./user.class.js"; // assuming your User class file is user.class.js

class Owner extends User {
  constructor(name, email, avatarUrl) {
    super(name, email, avatarUrl);
    this.ownedWorkspaces = [];
  }

  async transferOwnership(workspaceId, newOwnerId) {
    const workspace = this.ownedWorkspaces.find((w) => w.id === workspaceId);
    if (!workspace) throw new Error("Workspace not found");

    workspace.createdBy = newOwnerId;

    // Optionally remove from current owner's list
    this.ownedWorkspaces = this.ownedWorkspaces.filter(
      (w) => w.id !== workspaceId
    );
  }

  async deleteWorkspace(workspaceId) {
    const workspaceIndex = this.ownedWorkspaces.findIndex(
      (w) => w.id === workspaceId
    );
    if (workspaceIndex === -1) throw new Error("Workspace not found");

    this.ownedWorkspaces.splice(workspaceIndex, 1);
  }
}

export default Owner;
