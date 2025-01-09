"use client"
import { useRouter, useSearchParams } from '@node_modules/next/navigation';
import UpdateEventDetail from '@components/FormCard/UpdateEventDetail';

const UpdateDataEvent = () => {
    const router = useRouter();

    // get param from path
    const searchParams = useSearchParams();
    const pageEvent = Number(searchParams.get("eventID"));
    
    // handle route back
    const handleRouteBack = (e) => {
        e.preventDefault();
        router.back();
    };

    return (
        <div className='w-full h-full'>
            {pageEvent && (
                <UpdateEventDetail
                    eventID={pageEvent}
                    onClick={handleRouteBack}
                    pageEvent={pageEvent}
                />
            )}
        </div>
    );
};

export default UpdateDataEvent;
