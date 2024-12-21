"use client"


// component
import Header from "@components/layout/Header"
import Footer from "@components/layout/Footer"
import Events from "@components/All_Event/Events";

// hook
import { useState } from "react";



export default function AllEvent() {
    // search query
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <Events
                nameClass="justify-around"
                widthE="w-10/12"
                pageEvent="find_event"
                searchQuery={searchQuery}
            />

            <Footer />
        </>
    )
}