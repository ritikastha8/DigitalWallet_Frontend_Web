import { handleGetAllTermsConditions } from "@/lib/actions/admin/termscondition-action";
import Link from "next/link";

import { toast } from "react-toastify";
import TermsConditionTable from "./_components/TermsconditionTable";

export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const page = params.page as string || '1';
    const size = params.size as string || '10';
    const search = params.search as string || '';

    const response = await handleGetAllTermsConditions(
        page,
        size,
        search as string
    );

    if (!response.success) {
        throw new Error(response.message || 'Failed to load TermsConditions');
    }

    

    return (
        <div>
          
            <TermsConditionTable termsconditions={response.data} pagination={response.pagination} search={search} />
        </div>
    );
}