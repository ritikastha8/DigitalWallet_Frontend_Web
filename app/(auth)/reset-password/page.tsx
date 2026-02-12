import ResetPasswordForm from "../_components/ResetPasswordForm";
export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const query = await searchParams;
    const token = query.token as string | undefined;
    if(!token){
        throw new Error('Invalid or missing token');
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#D07522]">Reset Password</h1>
            <p className="text-sm text-gray-500 mt-1">Enter your new password</p>
            </div>
            <ResetPasswordForm token={token} />
        </div>);
}