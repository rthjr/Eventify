"use client"

// component
import Header from "@components/layout/Header"
import Footer from "@components/layout/Footer"
import Events from "@components/All_Event/Events"
// hook
import { useState } from "react"
import SurveyForm from "@components/FormCard/SurveyForm"

export default function Favorite() {


    // search query
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

            <Events
                nameClass="justify-around"
                widthE="w-10/12"
                pageEvent="favorite"
                removeLike="false"
                searchQuery={searchQuery}
            />

            <SurveyForm/>

            <Footer />
        </>
    )
}