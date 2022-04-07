import { getServer } from "../../testHelper";

describe("POST /version", () => {
  it("returns status code 200", async () => {
    const server = await getServer();
    const response = await server
      .get("/api/v1/version")
      .set("Accept", "application/json");

    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
  });
});
