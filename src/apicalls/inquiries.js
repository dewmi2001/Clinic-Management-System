import { axiosInstance } from "./axiosInstance";

// add inquiry
export const AddInquiry = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/inquiries/add-inquiry", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all inquiries
export const GetAllInquiries = async () => {
  try {
    const response = await axiosInstance.get("/api/inquiries/get-all-inquiries");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// update inquiry
export const UpdateInquiry = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/inquiries/update-inquiry/${payload._id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete inquiry
export const DeleteInquiry = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/inquiries/delete-inquiry/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get inquiry by id
export const GetInquiryById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/inquiries/get-inquiry-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


