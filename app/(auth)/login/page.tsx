import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
    return (
        <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-[#D07522]">Log In</h1>
                <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
            </div>
            <LoginForm />
        </div>
    );
}
