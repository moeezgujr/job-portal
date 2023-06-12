import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
    // Add any other headers you need
  },
});

export const getUsers = () => {
  return api.get("/users");
};
export const postUsers = (dto) => {
  return api.post("/users", dto); // Pass the data object (dto) as the second argument to the post method
};