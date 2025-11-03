import Owner from "./owner.class.js";
import User from "./user.class.js";

describe("User Class", () => {
  let user;

  beforeEach(() => {
    user = new User({
      name: "Sahil",
      email: "sahil@example.com",
      password: "secret",
    });
  });

  test("should create a user instance", () => {
    expect(user).toBeDefined();
    expect(user.name).toBe("Sahil");
    expect(user.email).toBe("sahil@example.com");
  });

  test("should have createdAt and updatedAt as Date", () => {
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });
});
