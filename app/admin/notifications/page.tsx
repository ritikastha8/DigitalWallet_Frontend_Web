import { toast } from "react-toastify";
import { handleGetAllNotifications } from "@/lib/actions/admin/notification-action";
import NotificationTable from "./_components/NotificationTable";

export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const page = params.page as string || '1';
    const size = params.size as string || '10';
    const search = params.search as string || '';

    const response = await handleGetAllNotifications(
        page,
        size,
        search as string
    );

    if (!response.success) {
        throw new Error(response.message || 'Failed to load notifications');
    }

    

    return (
        <div>
            {/* <Link className="text-gray-400 border border-gray-400 hover:bg-gray-100 p-2 rounded inline-block"
                href="/admin/users/create">Create User</Link> */}
            <NotificationTable notifications={response.data} pagination={response.pagination} search={search} />
        </div>
    );
}