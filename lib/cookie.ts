"use server";
import { cookies } from "next/headers";

interface UserData {
    _id: string;
    name: string;
    mobileNumber: string;
    role:  string;
    theme?: "light" | "dark" | "system";
    createdAt?: string;
    updatedAt?: string;
    [key: string]: any;
}
const cookieOptions = {
    path: "/" as const,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
};

export const setAuthToken = async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set({
        name: "auth_token",
        value: token,
        ...cookieOptions,
        httpOnly: true,
    });
};
export const getAuthToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value || null;
    return token;
}
export const setUserData = async (userData: UserData) => {
    const cookieStore = await cookies();
    cookieStore.set({
        name: "user_data",
        value: JSON.stringify(userData),
        ...cookieOptions,
    });
};
export const getUserData = async (): Promise<UserData | null> => {
    const cookieStore = await cookies();
    const userDataStr = cookieStore.get("user_data")?.value || null;
    // convert string back to object -> JSON.parse
    if(userDataStr){
        return JSON.parse(userDataStr);
    }
    return null;
}

export const clearAuthCookies = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");
    cookieStore.delete("user_data");
}