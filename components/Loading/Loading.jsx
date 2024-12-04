// components/loading.js
import React from 'react';
import { PuffLoader } from 'react-spinners';

const Loading = () => {


    return (
        <div className="flex flex-col gap-4 justify-center items-center h-screen bg-whtie">
            <PuffLoader color="#6c63ff" size={150} />
            <span>Loading ...</span>
        </div>
    );
};

export default Loading;
