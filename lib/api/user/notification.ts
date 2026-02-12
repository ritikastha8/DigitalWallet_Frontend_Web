import axios from "../axios"; // your axios instance
import { API } from "../endpoints";

export const getUserNotifications = async (page: number = 1, size: number = 10) => {
  try {
    const response = await axios.get( API.USER.NOTIFICATION.GET_ALL, {
      params: { page, size },
    });
    return response.data; // { success: true, data: [...] }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch notifications"
    );
  }
};
export const getUserNotificationById = async (id: string) => {
  try {

    const response = await axios.get(
            API.USER.NOTIFICATION.GET_ONE(id)
        );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch notification"
    );
  }
};
