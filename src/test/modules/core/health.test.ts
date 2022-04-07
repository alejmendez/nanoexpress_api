import { getServer } from "../../testHelper";

describe("POST /login", () => {
  it("returns status code 200", async () => {
    const server = await getServer();
    const response = await server
      .get("/api/v1/auth/login")
      .set("Accept", "application/json")
      .send({
        email: "alejmendez@gmail.com",
        password: "qwer1234",
        rememberMe: true,
      });

    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
  });
});
