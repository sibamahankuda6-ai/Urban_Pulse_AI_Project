import axiosInstance from "../api/axiosConfig";

const notificationService = {

  getAllNotifications: async () => {
    const response = await axiosInstance.get("/notifications");
    return response.data;
  },

  createNotification: async (notification) => {
    const response = await axiosInstance.post(
      "/notifications",
      notification
    );
    return response.data;
  },

  deleteNotification: async (id) => {
    const response = await axiosInstance.delete(
      `/notifications/${id}`
    );
    return response.data;
  }

};

export default notificationService;