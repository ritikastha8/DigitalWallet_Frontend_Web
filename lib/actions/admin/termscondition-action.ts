"use server";

import { createTermsCondition, deleteTermsCondition, getAllTermsConditions, getTermsConditionById, updateTermsCondition } from '@/lib/api/admin/termscondition';
import { revalidatePath } from 'next/cache';

export const handleCreateTermsCondition= async (data: { title: string; description: string }) => {
    try {
        const response = await createTermsCondition(data)
        if (response.success) {
            revalidatePath('/admin/termsconditions');
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


export const handleGetAllTermsConditions = async (
    page: string, size: string, search?: string
) => {
    try {
        const currentPage = parseInt(page) || 1;
        const currentSize = parseInt(size) || 10;

        const response = await getAllTermsConditions(currentPage, currentSize, search);
        if (response.success) {
            return {
                success: true,
                message: 'Get all terms conditions successful',
                data: response.data,
                pagination: response.pagination
            }
        }
        return {
            success: false,
            message: response.message || 'Get all terms conditions failed'
        }
    } catch (error: Error | any) {
        return {
            success: false,
            message: error.message || 'Get all terms conditions action failed'
        }
    }
}
export const handleGetOneTermsCondition = async (id: string) => {
    try {
        const response = await getTermsConditionById(id);
        if (response.success) {
            return {
                success: true,
                message: 'Get terms condition by id successful',
                data: response.data
            }
        }
        return {
            success: false,
            message: response.message || 'Get terms condition by id failed'
        }
    } catch (error: Error | any) {
        return {
            success: false,
            message: error.message || 'Get terms condition by id action failed'
        }
    }
}

export const handleUpdateTermsCondition = async (id: string, data: { title: string; description: string }) => {
    try {
        const response = await updateTermsCondition(id, data)
        if (response.success) {
            revalidatePath('/admin/termsconditions');
            return {
                success: true,
                message: 'Update terms condition successful',
                data: response.data
            }
        }
        return {
            success: false,
            message: response.message || 'Update terms condition failed'
        }
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Update Terms Condition action failed' }
    }
}

export const handleDeleteTermsCondition = async (id: string) => {
    try {
        const response = await deleteTermsCondition(id)
        if (response.success) {
            revalidatePath('/admin/termsconditions');
            return {
                success: true,
                message: 'Delete terms condition successful'
            }
        }
        return {
            success: false,
            message: response.message || 'Delete TermsCondition failed'
        }
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Delete Terms Condition action failed' }
    }
}
