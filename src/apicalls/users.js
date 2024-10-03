import { axiosInstance } from "./axiosInstance";

// register a user
export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/register", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// login a user
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/login", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get user details

export const GetLoggedInUserDetails = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-logged-in-user");
    return response.data;
  } catch (error) {
    throw error;
  }
}

