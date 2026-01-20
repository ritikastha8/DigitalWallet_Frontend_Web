import RegisterForm from "../_components/RegisterForm";
import { handleRegister } from "@/lib/actions/auth-action";
export default function RegisterPage() {
    return (
        <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-[#D07522]">Create Your Account</h1>
                <p className="text-sm text-gray-500 mt-1">Sign up to get started</p>
            </div>
            <RegisterForm />
        </div>
    );
}
