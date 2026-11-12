import axiosInstance from "../api/axiosConfig";

const authService = {
  login: async (email, password) => {
    const response = await axiosInstance.post("/users/login", {
      email,
      password,
    });
    const data = response.data;
    if (data && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", (data.role || "USER").toLowerCase());
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          phone: data.phone,
        })
      );
    }
    return data;
  },

  register: async ({ name, email, phone, password }) => {
    const response = await axiosInstance.post("/users/register", {
      name,
      email,
      phone,
      password,
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  getRole: () => {
    return localStorage.getItem("role");
  },

  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    return Boolean(isLoggedIn && token);
  },
};

export default authService;