import SurveyForm from '@components/FormCard/SurveyForm'
import Footer from '@components/layout/Footer'
import Header from '@components/layout/Header'
import React from 'react'

const page = () => {

    return (
        <div className="flex flex-col gap-8 ">
            <Header />
            <div className='m-auto w-5/12'>
                <SurveyForm />
            </div>
            <Footer />
        </div>
    )
}
export default page