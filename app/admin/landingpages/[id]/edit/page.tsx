import { handleGetOneLandingPage } from "@/lib/actions/admin/landingpage-action";
import UpdateLandingPageForm from "../../_components/UpdateLandingpageForm";
import { notFound } from "next/navigation";


export default async function Page({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const response = await handleGetOneLandingPage(id);

    if (!response.success || !response.data) {
        notFound();
    }

    return (
        <div>
            <UpdateLandingPageForm landingpage={response.data} />
        </div>
    );
}
