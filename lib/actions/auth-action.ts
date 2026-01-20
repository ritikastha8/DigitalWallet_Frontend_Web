// server side processing of auth axtions
"use server";
import { success } from "zod";
import { setAuthToken,setUserData,clearAuthCookies } from "../cookie";
import {register,login} from "../api/auth";
import { LoginData, RegisterData } from "@/app/(auth)/schema"
import { redirect } from "next/navigation";

export const handleRegister = async (data: RegisterData ) =>{
    try{
        // how to get data from component
        const result = await register(data);
        // how to send back to component
        if(result.success){
            return {
                success:true,
                message:"Registration successful",
                data: result.data
            };
        }
        return {
            success: false, message: result.message || "Registration failed"
        }
    }catch(err: Error | any){
        return {success:false,message:err.message || "Registration failed"};
    }
}
export const handleLogin = async (data: LoginData) =>{
     try{
        // how to get data from component
        const result = await login(data); // change
        // how to send back to component
        if(result.success){
               await setAuthToken(result.token);
               await setUserData(result.data);
            return {
                success:true,
                message:"Login successful",
                data: result.data
            };
        }
        return {
            success: false, message: result.message || "Login failed"
        }
    }catch(err: Error | any){
        return {success:false,message:err.message || "Login failed"};
    }   
}

export const handleLogout = async () => {
    await clearAuthCookies();
    return redirect('/login');
}
