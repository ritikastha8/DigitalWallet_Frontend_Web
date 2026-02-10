import Link from "next/link";
import { handleGetAllLandingPages } from "@/lib/actions/admin/landingpage-action";

import { toast } from "react-toastify";
import LandingPageTable from "./_components/LandingpageTable";

export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const page = params.page as string || '1';
    const size = params.size as string || '10';
    const search = params.search as string || '';

    const response = await handleGetAllLandingPages(
        page,
        size,
        search as string
    );

    if (!response.success) {
        throw new Error(response.message || 'Failed to load landing pages');
    }

    

    return (
        <div>

            <LandingPageTable landingpages={response.data} pagination={response.pagination} search={search} />
        </div>
    );
}