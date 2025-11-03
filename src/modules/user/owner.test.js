import Owner from "./owner.class.js";

describe("Owner Class", () => {
  let owner;

  beforeEach(() => {
    owner = new Owner({
      name: "Admin",
      email: "admin@example.com",
      password: "root",
    });
  });

  test("should create owner instance", () => {
    expect(owner).toBeDefined();
    expect(owner.ownedWorkspaces).toEqual([]);
  });

});
