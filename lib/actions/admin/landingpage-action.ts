"use server";
import { createLandingPage, getAllLandingPages, getLandingPageById, deleteLandingPage, updateLandingPage } from "@/lib/api/admin/landingpage";
import { revalidatePath } from 'next/cache';

export const handleCreateLandingPage = async (data: FormData) => {
    try {
        const response = await createLandingPage(data)
        if (response.success) {
            revalidatePath('/admin/landingpages');
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


export const handleGetAllLandingPages = async (
    page: string, size: string, search?: string
) => {
    try {
        const currentPage = parseInt(page) || 1;
        const currentSize = parseInt(size) || 10;

        const response = await getAllLandingPages(currentPage, currentSize, search);
        if (response.success) {
            return {
                success: true,
                message: 'Get all landing pages successful',
                data: response.data,
                pagination: response.pagination
            }
        }
        return {
            success: false,
            message: response.message || 'Get all landing pages failed'
        }
    } catch (error: Error | any) {
        return {
            success: false,
            message: error.message || 'Get all landing pages action failed'
        }
    }
}
export const handleGetOneLandingPage = async (id: string) => {
    try {
        const response = await getLandingPageById(id);
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

export const handleUpdateLandingPage = async (id: string, data: FormData) => {
    try {
        const response = await updateLandingPage(id, data)
        if (response.success) {
            revalidatePath('/admin/landingpages');
            return {
                success: true,
                message: 'Update landing page successful',
                data: response.data
            }
        }
        return {
            success: false,
            message: response.message || 'Update landing page failed'
        }
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Update landing page action failed' }
    }
}

export const handleDeleteLandingPage = async (id: string) => {
    try {
        const response = await deleteLandingPage(id)
        if (response.success) {
            revalidatePath('/admin/landingpages');
            return {
                success: true,
                message: 'Delete landing page successful'
            }
        }
        return {
            success: false,
            message: response.message || 'Delete landing page failed'
        }
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Delete landing page action failed' }
    }
}