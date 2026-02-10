import { handleGetOneTermsCondition } from "@/lib/actions/admin/termscondition-action";
import UpdateTermsConditionForm from "../../_components/UpdateTermsconditionForm";



export default async function Page({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const response = await handleGetOneTermsCondition(id);

    if (!response.success) {
        throw new Error(response.message || 'Failed to load terms condition');
    }

    return (
        <div>
            <UpdateTermsConditionForm termsconditions={response.data} />
        </div>
    );
}
