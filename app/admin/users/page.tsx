import { handleGetAllUsers } from "@/lib/actions/admin/user-action";
import UserTable from "./_components/UserTable";

export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const page = params.page as string || '1';
    const size = params.size as string || '10';

    const search =
  typeof params.search === "string" && params.search.trim() !== ""
    ? params.search
    : undefined;

const response = await handleGetAllUsers(
  page,
  size,
  search
);


    if (!response.success) {
        throw new Error(response.message || 'Failed to load users');
    }
    return (
        <div>

            <UserTable users={response.data} pagination={response.pagination} search={search} />
        </div>
    );
}