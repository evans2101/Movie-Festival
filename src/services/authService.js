import axios from "axios";

const API_URL = "http://localhost:3000/users";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.get(`${API_URL}?username=${username}&password=${password}`);
    if (response.data.length > 0) {
      return response.data[0];
    } else {
      throw new Error("Invalid username or password!");
    }
  } catch (error) {
    throw new Error(error.message || "Login failed. Please try again!");
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password,
      role: "user",
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Registration failed. Please try again!");
  }
};
