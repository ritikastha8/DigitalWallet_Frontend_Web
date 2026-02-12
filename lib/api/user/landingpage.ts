import axios from "../axios"; // your axios instance
import { API } from "../endpoints";

export const getUserLandingPages = async (page: number = 1, size: number = 10) => {
  try {
    const response = await axios.get( API.USER.LANDINGPAGE.GET_ALL, {
      params: { page, size },
    });
    return response.data; // { success: true, data: [...] }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch landing pages"
    );
  }
};
export const getUserLandingPageById = async (id: string) => {
  try {

    const response = await axios.get(
            API.USER.LANDINGPAGE.GET_ONE(id)
        );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch landing pages"
    );
  }
};
