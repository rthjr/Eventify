"use client"
import ReportForm from '@components/FormCard/ReportForm'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from '@node_modules/next/navigation';

const Report = () => {
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
        <div className="w-full h-auto flex items-center justify-center p-4">
            {pageEvent && (
                <ReportForm onClick={handleRouteBack} />
            )}
        </div>
    );
};

export default Report;
