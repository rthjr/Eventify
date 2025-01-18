import ResponseForm from '@components/FormCard/ResponseForm'
import Footer from '@components/layout/Footer'
import Header from '@components/layout/Header'

const page = () => {
    return (
        <div className="flex flex-col gap-8 min-h-screen">
            <Header />
            <main className='flex-grow'>
                <div className='m-auto w-5/12'>
                    <ResponseForm />
                </div>
            </main>
            <Footer />
        </div>
    )
}
export default page