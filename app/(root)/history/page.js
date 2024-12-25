"use client"

import React from 'react'

// component
import Header from '@components/layout/Header'
import Footer from '@components/layout/Footer'
import Events from '@components/All_Event/Events'

// hook
import { useState } from 'react'

const page = () => {

  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Events
        nameClass="justify-around"
        widthE="w-10/12"
        pageEvent="history"
        removeLike="false"
        searchQuery={searchQuery}
        EventCreator= "yes"
      />
      <Footer />
    </>
  )
}

export default page