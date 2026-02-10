"use server";
import { createNotification, deleteNotification, getAllNotifications, getNotificationById, updateNotification } from "@/lib/api/admin/notification";
import { revalidatePath } from 'next/cache';

export const handleCreateNotification= async (data: { title: string; messageNotification: string }) => {
    try {
        const response = await createNotification(data)
        if (response.success) {
            revalidatePath('/admin/notifications');
            return {
                success: true,
                message: 'Registration successful',
                data: response.data
            }
        }
        return {
            success: false,
            message: response.message || 'Registration failed'
        }
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Registration action failed' }
    }
}


export const handleGetAllNotifications = async (
    page: string, size: string, search?: string
) => {
    try {
        const currentPage = parseInt(page) || 1;
        const currentSize = parseInt(size) || 10;

        const response = await getAllNotifications(currentPage, currentSize, search);
        if (response.success) {
            return {
                success: true,
                message: 'Get all Notifications successful',
                data: response.data,
                pagination: response.pagination
            }
        }
        return {
            success: false,
            message: response.message || 'Get all notifications failed'
        }
    } catch (error: Error | any) {
        return {
            success: false,
            message: error.message || 'Get all notifications action failed'
        }
    }
}
export const handleGetOneNotification = async (id: string) => {
    try {
        const response = await getNotificationById(id);
        if (response.success) {
            return {
                success: true,
                message: 'Get notification by id successful',
                data: response.data
            }
        }
        return {
            success: false,
            message: response.message || 'Get notification by id failed'
        }
    } catch (error: Error | any) {
        return {
            success: false,
            message: error.message || 'Get notification by id action failed'
        }
    }
}

export const handleUpdateNotification = async (id: string, data: { title: string; messageNotification: string }) => {
    try {
        const response = await updateNotification(id, data)
        if (response.success) {
            revalidatePath('/admin/notifications');
            return {
                success: true,
                message: 'Update notification successful',
                data: response.data
            }
        }
        return {
            success: false,
            message: response.message || 'Update notification failed'
        }
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Update notification action failed' }
    }
}

export const handleDeleteNotification = async (id: string) => {
    try {
        const response = await deleteNotification(id)
        if (response.success) {
            revalidatePath('/admin/notifications');
            return {
                success: true,
                message: 'Delete notification successful'
            }
        }
        return {
            success: false,
            message: response.message || 'Delete notification failed'
        }
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Delete notification action failed' }
    }
}
