import axios from "../axios"; // your axios instance
import { API } from "../endpoints";
import { normalizeLandingPage, normalizeLandingPages } from "@/lib/utils/landingpage-normalize";

export const getUserLandingPages = async (page: number = 1, size: number = 10) => {
  try {
    const response = await axios.get( API.USER.LANDINGPAGE.GET_ALL, {
      params: { page, size },
    });
    const payload = response.data;
    const normalizedLandingPages = normalizeLandingPages(payload?.data?.landingPages || []);

    return {
      ...payload,
      data: {
        ...(payload?.data || {}),
        landingPages: normalizedLandingPages,
      },
    };
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
    const payload = response.data;
    return {
      ...payload,
      data: normalizeLandingPage(payload?.data),
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch landing pages"
    );
  }
};
