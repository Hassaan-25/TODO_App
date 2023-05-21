import axiosInstance from "./api.config";

export const fetchTasks = async () => {
  try {
    const result = await axiosInstance.get("/tasks");
    return result.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const signup = async (payload) => {
  try {
    const result = await axiosInstance.post(`/user/save`, payload);
    return result.data;
  } catch (error) {
    throw error.response;
  }
};

export const login = async (payload) => {
  try {
    const result = await axiosInstance.post(`/user/signIn`, payload);
    return result.data;
  } catch (error) {
    throw error.response;
  }
};

// export const logout = async () => {
//   try {
//     Cookies.remove(`access_token`);
//   } catch (error) {
//     throw error.response;
//   }
// };

export const fetchUsersByCityAndAntigen = async (cityName, antigen) => {
  try {
    const encodedAntigen = encodeURIComponent(antigen);
    const result = await axiosInstance.get(
      `/user/fetch/?city=${cityName}&antigen=${encodedAntigen}`
    );
    return result.data;
  } catch (error) {
    throw error.response;
  }
};

export const addOrder = async (payload) => {
  try {
    const result = await axiosInstance.post(`/orders`, payload);
    return result.data;
  } catch (error) {
    throw error.response;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const result = await axiosInstance.delete(`/orders/${orderId}`);
    return result.data;
  } catch (error) {
    throw error.response;
  }
};
