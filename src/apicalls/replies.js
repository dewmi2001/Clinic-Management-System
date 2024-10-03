import { axiosInstance } from "./axiosInstance";

// add reply
// export const AddReply = async (payload) => {
//   try {
//     const response = await axiosInstance.post("/api/replies/add-reply", payload);
//     return response.data;
//   } catch (error) {
//     throw error;
//   } 
// };

export const AddReply = async ( payload) => {
  try {
    const response = await axiosInstance.post(`/api/replies/add-reply`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all inquiries
export const GetAllReplies = async () => {
  try {
    const response = await axiosInstance.get("/api/replies/get-all-replies");
    return response.data;
  } catch (error) {
    throw error;
  }
};


// get reply by id
export const GetReplyById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/replies/get-reply-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get replies by inquiry ID
export const GetRepliesByInquiryId = async (inquiryId) => {
  try {
    const response = await axiosInstance.get(`/api/replies/get-replies-by-inquiry/${inquiryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


