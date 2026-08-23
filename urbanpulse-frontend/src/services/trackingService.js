import axiosInstance from "../api/axiosConfig";

const trackingService = {

  trackComplaint: async (id) => {

    const response = await axiosInstance.get(
      `/tracking/${id}`
    );

    return response.data;
  }

};

export default trackingService;