import axios from "axios";
import { API } from "../endpoints";


export const getAllNotifications = async () => {
  try {
    const response = await axios.get(API.USER.NOTIFICATION.GET_ALL);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Fetch notifications failed');
  }
};

