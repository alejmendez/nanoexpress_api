import request from "supertest";
import { app } from "../src/server";

describe("POST /register", () => {
  it("returns status code 201 if first name is passed", async () => {
    const res = await request(app)
      .post("/register")
      .send({ firstName: "John" });
    // toEqual recursively checks every field of an object or array.
    expect(res.statusCode).toEqual(201);
  });
});
