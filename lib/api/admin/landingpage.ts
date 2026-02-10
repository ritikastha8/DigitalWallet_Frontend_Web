import { API } from "../endpoints";
import axios from "../axios";

export const  createLandingPage= async (landingpageData: any) => {
    try {
        const response = await axios.post(
            API.ADMIN.LANDINGPAGE.CREATE,
            landingpageData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // for file upload/multer
                }
            }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Create landing page failed');
    }
}
export const getLandingPageById = async (id: string) => {
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

export const getAllLandingPages = async (
    page: number, size: number, search?: string
) => {
    try {
        const response = await axios.get(
            API.ADMIN.LANDINGPAGE.GET_ALL,
            {
                params: { page, size, search }
            }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Get all landing pages failed');
    }
}

export const updateLandingPage = async (id: string, updateData: any) => {
    try {
        const response = await axios.put(
            API.ADMIN.LANDINGPAGE.UPDATE(id),
            updateData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // for file upload/multer
                }
            }
        );
        return response.data;
    }
    catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Update landing page failed');
    }
}

export const deleteLandingPage = async (id: string) => {
    try {
        const response = await axios.delete(
            API.ADMIN.LANDINGPAGE.DELETE(id)
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Delete landing page failed');
    }
}