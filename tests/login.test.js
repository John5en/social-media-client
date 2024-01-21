import * as storage from "../src/js/storage/index.js";
import { login } from "../src/js/api/auth/login";

jest.mock("../src/js/storage/index.js");

/* global global */
global.fetch = jest.fn();

describe("login function test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully log in and save token", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ accessToken: "custom-token", user: "custom-user" }),
    });

    await login("custom@example.com", "custom-password");

    expect(fetch).toHaveBeenCalledWith(expect.any(String), {
      method: "post",
      body: JSON.stringify({
        email: "custom@example.com",
        password: "custom-password",
      }),
      headers: expect.any(Object),
    });

    expect(storage.save).toHaveBeenCalledWith("token", "custom-token");

    expect(storage.save).toHaveBeenCalledWith("profile", {
      user: "custom-user",
    });
  });
});
