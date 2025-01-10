"use client";

import { Suspense } from 'react';
import CancellationForm from '@components/FormCard/CancellationForm';
import { useRouter, useSearchParams } from 'next/navigation';

const Cancellation = () => {
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
        <div className="flex justify-center items-center p-4 w-full h-screen">
            {pageEvent && (
                <div className='w-full h-fit'>
                    <CancellationForm
                        onClick={handleRouteBack}
                        pageEvent={pageEvent}
                    />
                </div>
            )}
        </div>
    );
};

// Wrap the component in a Suspense boundary
const CancellationWithSuspense = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Cancellation />
    </Suspense>
);

export default CancellationWithSuspense;