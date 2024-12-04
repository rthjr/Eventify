"use client";

import Footer from '@components/Footer';
import Header from '@components/Header';
import React, { useState, useEffect } from 'react';
import Sidebar from '@components/Sidebar';
import Loading from '@components/Loading/Loading';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Create from '@components/CreateEvent/Create';
import MyEvent from '@components/CreateEvent/MyEvent';
import Dashboard from '@components/CreateEvent/Dashboard';

const CreateEvent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(true);
  const [isMenu, setIsMenu] = useState('create'); // Initialize with a default value

  useEffect(() => {
    if (status === 'loading' || status === 'unauthenticated') {
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleMenuSelect = (menu) => {
    setIsMenu(menu);
  };

  if (showLoading && status === 'unauthenticated') {
    return <Loading />;
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center border'>
      <Header />
      <div className='w-10/12 flex my-20 lg:justify-between'>

        <div className='lg:w-3/12 '>
          <Sidebar onMenuSelect={handleMenuSelect} />
        </div>
        <div className='lg:w-8/12'>
          {isMenu === 'create' ? (
            <Create />
          ) : isMenu === 'myevent' ? (
            <MyEvent />
          ) : (
            <Dashboard />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateEvent;