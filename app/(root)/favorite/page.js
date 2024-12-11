"use client"

// component
import Header from "@components/layout/Header"
import Footer from "@components/layout/Footer"
import Events from "@components/All_Event/Events"

export default function Favorite() {


    return (
        <>
            <Header />

            <Events
                nameClass="justify-around"
                widthE="w-10/12"
                pageEvent = "favorite"
                removeLike = "false"
            />

            <Footer />
        </>
    )
}