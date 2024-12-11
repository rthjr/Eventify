"use client"
import CancellationForm from '@components/FormCard/CancellationForm';
import React, { useState } from 'react'
import { useRouter, useSearchParams } from '@node_modules/next/navigation';

const Cancellation = () => {
    const router = useRouter();

    // get param from path
    const searchParams = useSearchParams();
    const pageEvent = searchParams.get("pageEvent");

    // handle route back
    const handleRouteBack = (e) => {
        e.preventDefault();
        router.push(`/${pageEvent}`);
    };

    return (
        <div className=" flex justify-center items-center p-4 w-screen h-screen">
            {pageEvent && (
                <CancellationForm
                    onClick={handleRouteBack}
                    pageEvent={pageEvent}
                />
            )}
        </div>
    );
};

export default Cancellation;
