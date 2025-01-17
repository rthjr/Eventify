"use client"

// component
import Header from "@components/layout/Header"
import Footer from "@components/layout/Footer"
import Events from "@components/All_Event/Events"
import { useEffect } from "react"
import { useRouter } from "@node_modules/next/navigation"

import { signOut, useSession } from 'next-auth/react';
import { useState } from "react";
import LoadingPage from "@components/util/Loading"
import React from "react";

export default function Favorite() {


    const { data: session, status } = useSession();

    const [showLoading, setShowLoading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        if (status === 'loading') {
            setShowLoading(true); // Show loading while session is being fetched
        } else if (status === 'unauthenticated') {
            router.push('/login'); // Redirect to login if unauthenticated
        } else {
            setShowLoading(false); // Session is loaded and user is authenticated
        }
    }, [status, router]);

    // Show loading state while session is being fetched
    if (showLoading || status === 'loading') {
        return (
            <div className='flex justify-center items-center'>
                <div className="min-w-screen w-full flex justify-center items-center">
                    <div>
                        <LoadingPage wh="h-screen" />
                    </div>
                </div>
            </div>
        );
    }


    return (
        <>
            <Header />

            <Events
                nameClass="justify-around"
                widthE="w-10/12"
                pageEvent="favorite"
                removeLike="false"
            />

            <Footer />
        </>
    )
}