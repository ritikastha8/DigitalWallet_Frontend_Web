import { handleGetOneNotification } from "@/lib/actions/admin/notification-action";
import UpdateNotificationForm from "../../_components/UpdateNotificationForm";

export default async function Page({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const response = await handleGetOneNotification(id);

    if (!response.success) {
        throw new Error(response.message || 'Failed to load notification');
    }

    return (
        <div>
            <UpdateNotificationForm notification={response.data} />
        </div>
    );
}
