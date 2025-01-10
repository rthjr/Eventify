"use client";

import ReportForm from '@components/FormCard/ReportForm';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react'; 

export const dynamic = 'force-dynamic'; 

const ReportContent = () => {
    const router = useRouter();

    // Get param from path
    const searchParams = useSearchParams();
    const pageEvent = searchParams.get("pageEvent");

    // Handle route back
    const handleRouteBack = (e) => {
        e.preventDefault();
        router.push(`/${pageEvent}`);
    };

    return (
        <div className="w-full h-auto flex items-center justify-center p-4">
            {pageEvent && (
                <ReportForm
                    onClick={handleRouteBack}
                    pageEvent={pageEvent}
                />
            )}
        </div>
    );
};

const Report = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReportContent />
        </Suspense>
    );
};

export default Report;