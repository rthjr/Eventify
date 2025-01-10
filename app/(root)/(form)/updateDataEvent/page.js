"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import UpdateEventDetail from '@components/FormCard/UpdateEventDetail';
import { Suspense } from 'react'; // Import Suspense

const UpdateDataEventContent = () => {
    const router = useRouter();

    // Get param from path
    const searchParams = useSearchParams();
    const pageEvent = Number(searchParams.get("eventID"));

    // Handle route back
    const handleRouteBack = (e) => {
        e.preventDefault();
        router.back();
    };

    return (
        <div className='w-full h-full'>
            {pageEvent && (
                <UpdateEventDetail
                    eventID={pageEvent}
                    onClick={handleRouteBack}
                    pageEvent={pageEvent}
                />
            )}
        </div>
    );
};

const UpdateDataEvent = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UpdateDataEventContent />
        </Suspense>
    );
};

export default UpdateDataEvent;