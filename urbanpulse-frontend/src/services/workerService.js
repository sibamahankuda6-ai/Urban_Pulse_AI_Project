import axiosInstance from "../api/axiosConfig";

const workerService = {

  getAllWorkers: async () => {
    const response = await axiosInstance.get("/workers");
    return response.data;
  },

  createWorker: async (worker) => {
    const response = await axiosInstance.post(
      "/workers",
      worker
    );
    return response.data;
  },

  updateWorker: async (id, worker) => {
    const response = await axiosInstance.put(
      `/workers/${id}`,
      worker
    );
    return response.data;
  },

  deleteWorker: async (id) => {
    const response = await axiosInstance.delete(
      `/workers/${id}`
    );
    return response.data;
  }

};

export default workerService;