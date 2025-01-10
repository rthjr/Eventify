"use client"

import React from 'react'

// component
import Header from '@components/layout/Header'
import Footer from '@components/layout/Footer'
import Events from '@components/All_Event/Events'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from '@node_modules/next-auth/react';
import { useRouter } from '@node_modules/next/navigation'

const Page = () => {

  const router = useRouter()

  // Session and router hooks
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");

  // api
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://coding-fairy.com/api/mock-api-resources/1734491523/eventify');
        const data = await response.json();
        // Check if the API response contains registerEmail
        if (data.registerEmail && data.registerEmail === email) {
          setEmail(data.registerEmail); // Store registerEmail in state
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Set emailAuth based on session
  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    } else {
      setEmail('');
    }
  }, [session]);
  console.log({email})

  return (
    <>
      <Header/>
      <Events
        nameClass="justify-around"
        widthE="w-10/12"
        pageEvent="history"
        removeLike="false"
        paramPage = "history"
        EventCreator="yes"
        email={email}
      />
      <Footer />
    </>
  )
}

export default Page