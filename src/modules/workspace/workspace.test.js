import Workspace from "./workspace.class.js";
import User from "../user/user.class.js";
import Team from "../team/team.class.js";

describe("Workspace Class", () => {
  let workspace, owner;

  beforeEach(() => {
    owner = new User({
      name: "Sahil",
      email: "sahil@example.com",
      password: "1234",
    });
    workspace = new Workspace({ name: "Dev Hub", owner });
  });

  test("should create a workspace", () => {
    expect(workspace).toBeDefined();
    expect(workspace.name).toBe("Dev Hub");
    expect(workspace.owner).toBe(owner);
  });

  test("should add a team to workspace", async () => {
    const team = new Team({ name: "team-1", workspace });
    await workspace.addTeam(team);
    expect(workspace.teams.length).toBe(1);
    expect(workspace.teams[0]).toBe(team);
  });

  test("should get all pages and tasks (empty arrays initially)", async () => {
    const pages = await workspace.getAllPages();
    const tasks = await workspace.getAllTasks();
    expect(pages).toEqual([]);
    expect(tasks).toEqual([]);
  });
});
