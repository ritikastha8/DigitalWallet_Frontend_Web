import { API } from "../endpoints";
import axios from "../axios";

export const createNotification = async (notificationData: { title: string; messageNotification: string }) => {
    try {
        const response = await axios.post(
            API.ADMIN.NOTIFICATION.CREATE,
            notificationData,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Create notification failed');
    }
}
export const getNotificationById = async (id: string) => {
    try {
        const response = await axios.get(
            API.ADMIN.NOTIFICATION.GET_ONE(id)
        );
        return response.data;
    }
    catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Get notification by id failed');
    }
}

export const getAllNotifications = async (
    page: number, size: number, search?: string
) => {
    try {
        const response = await axios.get(
            API.ADMIN.NOTIFICATION.GET_ALL,
            {
                params: { page, size, search }
            }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Get all notifications failed');
    }
}

export const updateNotification = async (id: string, updateData: { title: string; messageNotification: string }) => {
    try {
        const response = await axios.put(
            API.ADMIN.NOTIFICATION.UPDATE(id),
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
            || error.message || 'Update notification failed');
    }
}

export const deleteNotification = async (id: string) => {
    try {
        const response = await axios.delete(
            API.ADMIN.NOTIFICATION.DELETE(id)
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Delete notification failed');
    }
}
