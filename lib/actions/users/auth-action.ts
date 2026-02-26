// server side processing of auth axtions
"use server";
import { LoginData, RegisterData, RegisterPinData } from "@/app/(auth)/schema"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { login, register, requestPasswordReset, resetPassword, setPin, updateProfile, updateTheme, whoAmI, type ThemeValue } from "@/lib/api/user/auth";
import { clearAuthCookies, setAuthToken, setUserData } from "@/lib/cookie";

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

export const handleRegisterPin = async (data: RegisterPinData) => {
  try {
    const result = await setPin(data);
    if (result.success) {
      return {
        success: true,
        message: "PIN set successfully",
        data: result.data,
      };
    }
    return {
      success: false,
      message: result.message || "Failed to set PIN",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "PIN setup failed" };
  }
};
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

export async function handleWhoAmI() {
    try {
        const result = await whoAmI();
        if (result.success) {
            return {
                success: true,
                message: 'User data fetched successfully',
                data: result.data
            };
        }
        return { success: false, message: result.message || 'Failed to fetch user data' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function handleUpdateTheme(theme: ThemeValue) {
    try {
        const result = await updateTheme(theme);
        if (result.success) {
            const whoamiResult = await whoAmI();
            if (whoamiResult.success && whoamiResult.data) {
                await setUserData(whoamiResult.data);
            }
            return { success: true, message: "Theme updated successfully" };
        }
        return { success: false, message: result.message || "Failed to update theme" };
    } catch (error: Error | any) {
        return { success: false, message: error.message || "Could not save theme" };
    }
}

export async function handleUpdateProfile(profileData: FormData) {
    try {
        const result = await updateProfile(profileData);
        if (result.success) {
            await setUserData(result.data); // update cookie 
            revalidatePath('/user/profile'); // revalidate profile page/ refresh new data
            return {
                success: true,
                message: 'Profile updated successfully',
                data: result.data
            };
        }
        return { success: false, message: result.message || 'Failed to update profile' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export const handleRequestPasswordReset = async (email: string) => {
    try {
        const response = await requestPasswordReset(email);
        if (response.success) {
            return {
                success: true,
                message: 'Password reset email sent successfully'
            }
        }
        return { success: false, message: response.message || 'Request password reset failed' }
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Request password reset action failed' }
    }
};

export const handleResetPassword = async (token: string, newPassword: string) => {
    try {
        const response = await resetPassword(token, newPassword);
        if (response.success) {
            return {
                success: true,
                message: 'Password has been reset successfully'
            }
        }
        return { success: false, message: response.message || 'Reset password failed' }
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Reset password action failed' }
    }
};
