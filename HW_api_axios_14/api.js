import axios from "axios";

async function getToDo() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    console.log(getToDo);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
getToDo();

async function getUser() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    console.log(getUser);
    console.log(response.data, response.status);
  } catch (error) {
    console.log(error);
  }
}
getUser();

async function getComments(id) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments/${id}`
    );
    console.log(getComments);
    console.log(response.status, response.data);
  } catch (error) {
    console.log(error);
  }
}
getComments(19);

async function changeZipcodeData() {
  try {
    const zipcodeData = { userId: 1, address: { zipcode: "92998-2025" } };
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      zipcodeData
    );
    console.log(changeZipcodeData);
    console.log(response.data, response.status);
  } catch (error) {
    console.log(error);
  }
}
changeZipcodeData();

async function changeCommentName() {
  try {
    const newComment = { id: 19, name: "MrsJack" };
    const response = await axios.post(
      `https://jsonplaceholder.typicode.com/comments`,
      newComment
    );
    console.log(changeCommentName);
    console.log(response.data, response.status);
  } catch {
    error;
    console.log(error);
  }
}
changeCommentName();