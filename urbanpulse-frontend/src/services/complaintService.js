import axiosInstance from "../api/axiosConfig";

const complaintService = {

  getAllComplaints: async () => {
    const response = await axiosInstance.get("/complaints");
    return response.data;
  },

  createComplaint: async (complaint) => {
    const response = await axiosInstance.post(
      "/complaints",
      complaint
    );
    return response.data;
  },

  updateComplaint: async (id, complaint) => {
    const response = await axiosInstance.put(
      `/complaints/${id}`,
      complaint
    );
    return response.data;
  },

  deleteComplaint: async (id) => {
    const response = await axiosInstance.delete(
      `/complaints/${id}`
    );
    return response.data;
  }

};

export default complaintService;