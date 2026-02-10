"use server";

import { getAllLandingPage, getLandingPageForUserById } from "@/lib/api/user/landingpage";

export const handleGetAllLandingPagesForUser = async () => {
  try {
    const response = await getAllLandingPage();

    if (response.success) {
      return {
        success: true,
        data: response.data,
      };
    }

    return {
      success: false,
      message: response.message || "Failed to fetch landing pages",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Landing page fetch failed",
    };
  }
};

export const handleGetOneLandingPageforUser = async (id: string) => {
    try {
        const response = await getLandingPageForUserById(id);
        if (response.success) {
            return {
                success: true,
                message: 'Get landing page by id successful',
                data: response.data
            }
        }
        return {
            success: false,
            message: response.message || 'Get landing page by id failed'
        }
    } catch (error: Error | any) {
        return {
            success: false,
            message: error.message || 'Get landing page by id action failed'
        }
    }
}



