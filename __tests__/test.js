import { app, server } from "../index.js";
import request from "supertest";
import { connectDB, disconnectDB } from "../db/mongoose.js";
let walletId = "";



afterAll(async () => {
 await disconnectDB();
  server.close();
});

// Test case for setup wallet API
describe("POST /api/wallet/setup", () => {
  test("should create a new wallet with initial balance and name", async () => {
    const response = await request(app)
      .post("/api/wallet/setup")
      .send({ balance: 20, name: "Hello world" })
      .expect(200);
    walletId = response.body.id;
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("balance", 20);
    expect(response.body).toHaveProperty("transactionId");
    expect(response.body).toHaveProperty("name", "Hello world");
    expect(response.body).toHaveProperty("date");
  });

  test("should return 400 for invalid request body", async () => {
    const response = await request(app)
      .post("/api/wallet/setup")
      .send({ balance: -10, name: "" });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid name");
  });
});

//Test Case for Transact Wallet API

describe("POST /api/wallet/transact/:walletId", () => {
  it("should credit the wallet", async () => {
    const response = await request(app)
      .post(`/api/wallet/transact/${walletId}`)
      .send({ amount: 10, description: "Recharge" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("balance");
    expect(response.body).toHaveProperty("transactionId");
  });

  it("should debit the wallet", async () => {
    const response = await request(app)
      .post(`/api/wallet/transact/${walletId}`)
      .send({ amount: -5, description: "Withdraw" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("balance");
    expect(response.body).toHaveProperty("transactionId");
  });

  it("should return 500 on server error", async () => {
    // Simulate a server error (e.g., invalid walletId)
    const response = await request(app)
      .post("/api/wallet/transact/invalid_wallet_id")
      .send({ amount: 10, description: "Recharge" });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid wallet id");
  });
});

describe("Test the GET /wallet/:id route", () => {
  // Test the GET /wallet/:id route
  it("should get wallet details by ID", async () => {
    const response = await request(app).get(`/api/wallet/${walletId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(String(walletId));
    expect(response.body.name).toBe("Hello world");
  });

  it("should fail to get wallet details with an invalid ID", async () => {
    const response = await request(app).get("/api/wallet/invalid_id");

    expect(response.status).toBe(400);
  });
});

describe("GET /transactions", () => {
  it("should get transaction details by ID", async () => {
    const response = await request(app).get(
      `/api/transactions?walletId=${walletId}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("transactions");
  });

  it("should fail to get transaction details with an invalid ID", async () => {
    const response = await request(app).get(
      `/api/transactions?walletId=${111}`
    );

    expect(response.status).toBe(400);
  });
});
