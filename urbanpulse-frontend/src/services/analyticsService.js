import axiosInstance from "../api/axiosConfig";

const analyticsService = {

  getDashboardData: async () => {

    const response =
      await axiosInstance.get(
        "/analytics/dashboard"
      );

    return response.data;
  }

};

export default analyticsService;