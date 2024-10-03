import { axiosInstance } from "./axiosInstance";

// add patient
export const AddPatient = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/patients/add-patient", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all patients
export const GetAllPatients = async () => {
  try {
    const response = await axiosInstance.get("/api/patients/get-all-patients");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// update patient
export const UpdatePatient = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/patients/update-patient/${payload._id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete patient
export const DeletePatient = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/patients/delete-patient/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get patient by id
export const GetPatientById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/patients/get-patient-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


