// API Layer
// Call api from backend
import { LoginData, RegisterData } from "@/app/(auth)/schema"
import axios from "./axios"; // IMPORTANT: "./axios" not "axios"
import {API} from "./endpoints";

export const register = async (registerData: RegisterData) =>{
    try{
        const response = await axios.post(
            API.AUTH.REGISTER,//API path '/api/auth/register
            registerData // body data
        );
        return response.data; // what the backend-controller returns
    }catch(err: Error | any){
        // 4xx or 5xx counts as exception
        throw new Error(
            err.response?.data?.message // message from backend
            || err.message // general error message
            || "Registration failed" // fallback message
        );
    }
}
export const login = async (loginData: LoginData)=>{
     try{
        const response = await axios.post(
            API.AUTH.LOGIN,//API path '/api/auth/register
            loginData // body data
        );
        return response.data; // what the backend-controller returns
    }catch(err: Error | any){
        // 4xx or 5xx counts as exception
        throw new Error(
            err.response?.data?.message // message from backend
            || err.message // general error message
            || "Login failed" // fallback message
        );
    }
}

export const whoAmI = async () => {
  try {
    const response = await axios.get(API.AUTH.WHOAMI);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response?.data?.message
      || error.message || 'Whoami failed');
  }
}

// export const updateProfile = async (profileData: FormData) => {
//   try {
//     const response = await axios.put(
//       API.AUTH.UPDATEPROFILE,
//       profileData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data', // for file upload/multer
//         },
//         withCredentials: true, // send cookies
//       }
//     );
//     return response.data;
//   } catch (error: Error | any) {
//     throw new Error(error.response?.data?.message
//       || error.message || 'Update profile failed');
//   }
// }


export const updateProfile = async (formData: FormData) => {
    try {
        const response = await axios.put(
            API.AUTH.UPDATEPROFILE, 
            formData, 
            { 
                headers: { 
                    // Axios automatically sets the boundary for FormData
                    'Content-Type': 'multipart/form-data' 
                },
                // If you are using cookies for sessions:
                withCredentials: true 
            }
        );
        
        return {
            success: true,
            data: response.data.user || response.data, // adjust based on your backend structure
            message: response.data.message || "Profile updated successfully"
        };
    }
    catch (err: any) {
        // Log the actual error for debugging
        console.error("Axios Update Error:", err.response?.data || err.message);
        
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Profile update failed"
        };
    };
}