import { Request } from "../../framework/request";
import * as faker from "faker";
import { expect } from "chai";

describe("Users API can - ", async function () {
  it("Create a user: given valid input, store the user against a new ID and return status code `201 Created` with the ID", async function () {
    const email = faker.internet.email(undefined, undefined, "somemail.net");
    // Register
    const resp = await new Request("http://localhost:8000/users/")
      .method("POST")
      .body({
        name: faker.internet.userName(),
        email: email,
        dateOfBirth: "1990-11-11",
      })
      .send();

    expect(resp.body, resp.body).to.be.an("object");
    expect(resp.statusCode).to.equal(201);
    expect(resp.body.id).to.not.be.empty;
    expect(typeof resp.body.id, resp.body).to.equal("string");
  });
  it("List users: return a full list of users", async function () {
    const resp = await new Request("http://localhost:8000/users/")
      .method("GET")
      .send();

    expect(resp.statusCode).to.equal(200);
    expect(resp.body, resp.body).to.be.an("Array");
    expect(resp.body[0].id).to.not.be.empty;
    expect(resp.body[0].name).to.not.be.empty;
    expect(resp.body[0].email).to.not.be.empty;
    expect(resp.body[0].dateOfBirth).to.not.be.empty;
    expect(typeof resp.body[0].id, resp.body[0]).to.equal("string");
  });
  it("Get a user by ID: returns the user data", async function () {
    const email = faker.internet.email(undefined, undefined, "somemail.net");
    // Register
    const resp = await new Request("http://localhost:8000/users/")
      .method("POST")
      .body({
        name: faker.internet.userName(),
        email: email,
        dateOfBirth: "1990-11-11",
      })
      .send();

    const respUserDetails = await new Request(
      `http://localhost:8000/users/${resp.body.id}`
    )
      .method("GET")
      .send();

    expect(respUserDetails.body, resp.body).to.be.an("object");
    expect(respUserDetails.statusCode).to.equal(200);
    expect(respUserDetails.body.id).to.not.be.empty;
    expect(typeof respUserDetails.body.id, respUserDetails.body).to.equal(
      "string"
    );
    expect(respUserDetails.body.id, respUserDetails.body).to.equal(
      resp.body.id
    );
  });
  it("Delete a user by ID: deletes a record based on the user record's ID value. Returns a `202 Accepted` code if the user record was deleted.", async function () {
    const email = faker.internet.email(undefined, undefined, "somemail.net");
    // Register
    const resp = await new Request("http://localhost:8000/users/")
      .method("POST")
      .body({
        name: faker.internet.userName(),
        email: email,
        dateOfBirth: "1990-11-11",
      })
      .send();

    const respUserDelete = await new Request(
      `http://localhost:8000/users/${resp.body.id}`
    )
      .method("DELETE")
      .send();

    expect(respUserDelete.statusCode).to.equal(202);

    try {
      const respUserDetails = await new Request(
        `http://localhost:8000/users/${resp.body.id}`
      )
        .method("GET")
        .send();
    } catch (err) {
      expect(err.statusCode).to.equal(404);
    }
  });
  it("handle error if an unknown user ID is supplied to Show Users Data that takes an ID in the path, return `404 Not Found`", async function () {
    let fakeId = `00000000`;
    try {
      const respUserDetails = await new Request(
        `http://localhost:8000/users/${fakeId}`
      )
        .method("GET")
        .send();
    } catch (err) {
      expect(err.statusCode).to.equal(404);
    }
  });
  it("handle error if an unknown user ID is supplied to Delete User that takes an ID in the path, return `404 Not Found`", async function () {
    let fakeId = `00000000`;
    try {
      const respUserDelete = await new Request(
        `http://localhost:8000/users/${fakeId}`
      )
        .method("DELETE")
        .send();
    } catch (err) {
      expect(err.statusCode).to.equal(404);
    }
  });
  it("handle error if input data does not pass validation against the schema, return `400 Bad Request`. Name shorter than 3 characters", async function () {
    const email = faker.internet.email(undefined, undefined, "somemail.net");
    try {
      const resp = await new Request("http://localhost:8000/users/")
        .method("POST")
        .body({
          name: `Jo`,
          email: email,
          dateOfBirth: "1990-11-11",
        })
        .send();
    } catch (err) {
      expect(err.statusCode).to.equal(400);
      expect(err.error.errors).to.equal(
        '"name" length must be at least 3 characters long'
      );
    }
  });
  it("handle error if input data does not pass validation against the schema, return `400 Bad Request`. Name longer than 30 character", async function () {
    const email = faker.internet.email(undefined, undefined, "somemail.net");
    try {
      const resp = await new Request("http://localhost:8000/users/")
        .method("POST")
        .body({
          name: `JohnsonJohnsonJohnsonJohnsonJohnson`,
          email: email,
          dateOfBirth: "1990-11-11",
        })
        .send();
    } catch (err) {
      expect(err.statusCode).to.equal(400);
      expect(err.error.errors).to.equal(
        '"name" length must be less than or equal to 30 characters long'
      );
    }
  });
  it("handle error if input data does not pass validation against the schema, return `400 Bad Request`. Additional fields are added", async function () {
    const email = faker.internet.email(undefined, undefined, "somemail.net");
    try {
      const resp = await new Request("http://localhost:8000/users/")
        .method("POST")
        .body({
          name: `John`,
          lastname: `Johnson`,
          email: email,
          dateOfBirth: "1990-11-11",
        })
        .send();
    } catch (err) {
      expect(err.statusCode).to.equal(400);
      expect(err.error.errors).to.equal('"lastname" is not allowed');
    }
  });
  it("handle error if input data does not pass validation against the schema, return `400 Bad Request`. Wrong date format", async function () {
    const email = faker.internet.email(undefined, undefined, "somemail.net");
    try {
      const resp = await new Request("http://localhost:8000/users/")
        .method("POST")
        .body({
          name: `John`,
          lastname: `Johnson`,
          email: email,
          dateOfBirth: "1990-11-1111",
        })
        .send();
    } catch (err) {
      expect(err.statusCode).to.equal(400);
      expect(err.error.errors).to.equal(
        '"dateOfBirth" must be in ISO 8601 date format'
      );
    }
  });
});
