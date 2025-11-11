import axios from "axios";
import { URL } from "../constants/API_url";

describe.skip("get axios", () => {
  test("get todo by id (GET)", async () => {
    const todoId = 19;
    const response = await axios.get(`${URL}/todos/${todoId}`);
    expect(response.data).toHaveProperty("id", todoId);
    expect(response.status).toBe(200);
  });

  test("get user name (GET)", async () => {
    const userId = 1;
    const response = await axios.get(`${URL}/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("username", "Bret");
  });

  test("get comment by id(GET)", async () => {
    const commentId = 19;
    const response = await axios.get(`${URL}/comments/${commentId}`);
    expect(response.data).toHaveProperty(
      "email",
      "Madelynn.Gorczany@darion.biz"
    );
    expect(response.status).toBe(200);
  });
});

describe.skip("post axios", () => {
  const apiClient = axios.create({
    baseURL: URL,
  });
  test("change zipcode data(POST)", async () => {
    const zipcodeData = { userId: 1, address: { zipcode: "92998-2025" } };
    const response = await apiClient.post(`/posts`, zipcodeData);
    expect(response.data).toHaveProperty("userId",1)
    expect(response.status).toBe(201);
    expect(response.data.address).toHaveProperty("zipcode", "92998-2025")
  });

    test("add new comment(POST)", async () => {
      const newComment = { id: 501, name: "MrsJack" };
    const response = await apiClient.post(`/comments`, newComment);
    expect(response.data).toHaveProperty("id",501)
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("name", "MrsJack")
  });
});