"use client"

import PinForm from "../_components/PinForm";


export default function PinPage() {
    return (
        <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-[#D07522]">Create PIN</h1>
                <p className="text-sm text-gray-500 mt-1">Create your 4-digits PIN</p>
            </div>
            <PinForm />
        </div>
    );
}
