import ForgetPasswordForm from "../_components/ForgetPasswordForm";


export default function Page() {
    return (
            <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-[#D07522]">Forgot Password</h1>
                    <p className="text-sm text-gray-500 mt-1">A reset link will be sent to your email</p>
                    </div>
                     <ForgetPasswordForm />
            </div>
    );
}