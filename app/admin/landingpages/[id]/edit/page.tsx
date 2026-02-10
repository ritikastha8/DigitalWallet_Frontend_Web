import { handleGetOneLandingPage } from "@/lib/actions/admin/landingpage-action";
import UpdateLandingPageForm from "../../_components/UpdateLandingpageForm";


export default async function Page({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const response = await handleGetOneLandingPage(id);

    if (!response.success) {
        throw new Error(response.message || 'Failed to load landing page');
    }

    return (
        <div>
            <UpdateLandingPageForm landingpage={response.data} />
        </div>
    );
}