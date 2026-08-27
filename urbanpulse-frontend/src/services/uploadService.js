import axios from "axios";

const uploadService = {

  uploadImage: async (file) => {

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    const response =
      await axios.post(
        "http://localhost:8080/api/uploads",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    return response.data;
  }

};

export default uploadService;