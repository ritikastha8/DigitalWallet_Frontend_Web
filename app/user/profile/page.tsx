import { notFound } from "next/navigation";

import { handleWhoAmI } from "@/lib/actions/users/auth-action";
import UpdateUserForm from "../_components/UpdateUserForm";


export default async function Page() {
    const result = await handleWhoAmI();

    if (!result.success) {
        throw new Error("Error fetching user data");
    }

    if (!result.data) {
        notFound();
    }

    return (
        <div>
            <UpdateUserForm user={result.data} />
        </div>
    );
}