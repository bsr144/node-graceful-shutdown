const supertest = require("supertest");
const chai = require("chai");
const app = require("../src/server");
const mongoose = require("mongoose");
const User = require("../src/models/userModel");

const expect = chai.expect;
const request = supertest(app);

describe("HTTP Server Tests", () => {
  // Before any tests run, connect to the database
  before((done) => {
    mongoose.connect(
      process.env.DB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      done
    );
  });

  // Before each test, you can seed some data into the database
  beforeEach(async () => {
    await User.create({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
  });

  // After each test, clear the database
  afterEach(async () => {
    await User.deleteMany({});
  });

  // After all tests are done, close the database connection
  after((done) => {
    mongoose.disconnect(done);
  });

  // Test for GET /api/users
  describe("GET /api/users", () => {
    it("should return all users", async () => {
      const response = await request.get("/api/users");
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
    });
  });

  // Test for POST /api/users
  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const newUser = {
        username: "newuser",
        email: "new@example.com",
        password: "password123",
      };
      const response = await request.post("/api/users").send(newUser);
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("username", newUser.username);
    });
  });

  // Test for PUT /api/users/:id
  describe("PUT /api/users/:id", () => {
    it("should update an existing user", async () => {
      let user = await User.findOne({ email: "test@example.com" });
      const updatedUser = {
        username: "updateduser",
        email: "updated@example.com",
        password: "newpassword123",
      };

      const response = await request
        .put(`/api/users/${user._id}`)
        .send(updatedUser);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("username", updatedUser.username);
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete an existing user", async () => {
      let user = await User.findOne({ email: "test@example.com" });

      const response = await request.delete(`/api/users/${user._id}`);
      expect(response.status).to.equal(204);

      const deletedUser = await User.findById(user._id);
      expect(deletedUser).to.be.null;
    });
  });
});
