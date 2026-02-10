
import { API } from "../endpoints";
import axios from "../axios";

export const createTermsCondition = async (termsconditionsData: { title: string; description: string }) => {
    try {
        const response = await axios.post(
            API.ADMIN.TERMSCONDITION.CREATE,
            termsconditionsData,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Create terms condition failed');
    }
}
export const getTermsConditionById = async (id: string) => {
    try {
        const response = await axios.get(
            API.ADMIN.TERMSCONDITION.GET_ONE(id)
        );
        return response.data;
    }
    catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Get terms condition by id failed');
    }
}

export const getAllTermsConditions = async (
    page: number, size: number, search?: string
) => {
    try {
        const response = await axios.get(
            API.ADMIN.TERMSCONDITION.GET_ALL,
            {
                params: { page, size, search }
            }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Get all terms conditions failed');
    }
}

export const updateTermsCondition = async (id: string, updateData: { title: string; description: string }) => {
    try {
        const response = await axios.put(
            API.ADMIN.TERMSCONDITION.UPDATE(id),
            updateData,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;
    }
    catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Update terms condition failed');
    }
}

export const deleteTermsCondition = async (id: string) => {
    try {
        const response = await axios.delete(
            API.ADMIN.TERMSCONDITION.DELETE(id)
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Delete terms condition failed');
    }
}
