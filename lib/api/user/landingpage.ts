import axios from "axios";
import { API } from "../endpoints";

export const getAllLandingPage = async () => {
  try {
    const response = await axios.get(API.LANDINGPAGE.GET_ALL);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Fetch terms conditions failed');
  }
};

export const getLandingPageForUserById = async (id: string) => {
    try {
        const response = await axios.get(
            API.ADMIN.LANDINGPAGE.GET_ONE(id)
        );
        return response.data;
    }
    catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Get landing page by id failed');
    }
}
