
// component
import Header from "@components/layout/Header"
import Footer from "@components/layout/Footer"
import Events from "@components/All_Event/Events";

export default function AllEvent() {


    return (
        <>
            <Header />

            <Events 
                nameClass= "justify-around"
                widthE = "w-10/12"
            />

            <Footer />
        </>
    )
}