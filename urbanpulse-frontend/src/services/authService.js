import axiosInstance from "../api/axiosConfig";

const authService = {

  login: async (email, password) => {
    const response = await axiosInstance.post("/users/login", {
      email,
      password
    });

    return response.data;
  }

};

export default authService;