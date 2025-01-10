"use client";

import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';
import React, { useState, useEffect } from 'react';
import MenuBar from '@components/layout/MenuBar';
import Loading from '@components/Loading/Loading';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Create from '@components/pages/CreateEvent/Create';
import MyEvent from '@components/pages/CreateEvent/MyEvent';
import Dashboard from '@components/pages/CreateEvent/Dashboard';
import { useSearch } from '../(form)/context/SearchContext';

const CreateEvent = () => {
  const {searchQuery, setSearchQuery} = useSearch()
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(true);
  const [isMenu, setIsMenu] = useState('dashboard'); // Initialize with a default value

  useEffect(() => {
    if (status === 'loading') {
      setShowLoading(true); // Show loading while session is being fetched
    } else if (status === 'unauthenticated') {
      router.push('/login'); // Redirect to login if unauthenticated
    } else {
      setShowLoading(false); // Session is loaded and user is authenticated
    }
  }, [status, router]);

  const handleMenuSelect = (menu) => {
    setIsMenu(menu);
  };

  // Show loading state while session is being fetched
  if (showLoading || status === 'loading') {
    return <Loading />;
  }

  // If session is not available, do not render the main content
  if (!session) {
    return null; // or redirect to login
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center border'>
      <Header
        isMenu={isMenu}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className='w-10/12 flex my-20 lg:justify-between'>

        <div className='lg:w-3/12 '>
          <MenuBar onMenuSelect={handleMenuSelect} />
        </div>
        <div className='lg:w-8/12'>
          {isMenu === 'dashboard' ? (
            <Dashboard email={session.user?.email} />
          ) : isMenu === 'create' ? (
            <Create />
          ) : isMenu === "myevent" && (
            <MyEvent
              paramPage="profileMyEvent"
              pageEvent="create_event"
              searchQuery={searchQuery}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateEvent;