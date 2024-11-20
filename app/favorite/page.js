"use client"

// component
import Header from "@components/Header"
import Footer from "@components/Footer"
import Events from "@components/All_Event/Events"

export default function Favorite() {


    return (
        <>
            <Header />

            <Events
                favoritePage="yes"
            />

            <Footer />
        </>
    )
}