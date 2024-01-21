import * as storage from "../src/js/storage/index.js";
import { logout } from "../src/js/api/auth/logout";

jest.mock("../src/js/storage/index.js");

describe("logout function test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should clear token from storage on logout", () => {
    storage.load.mockReturnValueOnce("custom-token");

    logout();

    expect(storage.remove).toHaveBeenCalledWith("token");
    expect(storage.remove).toHaveBeenCalledWith("profile");
  });
});
