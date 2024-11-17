import React from 'react'

import Image from '@node_modules/next/image'
import Link from '@node_modules/next/link'

// icon
import { IoMdArrowRoundBack } from "react-icons/io";

const Open = () => {
  return (
    <div className="flex w-9/12 h-auto bg-slate-200 shadow-lg">
      <div>

        <div>
          <IoMdArrowRoundBack
            size={24}
          />
          <h2 className='text-center text-xl font-bold'>Checkout</h2>
        </div>

        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus mollitia nisi autem aliquid temporibus aliquam nulla ipsa, suscipit eos sit et accusantium adipisci consequatur incidunt odit delectus placeat quidem omnis!
          Iste asperiores sequi, quibusdam at voluptatum expedita in, aliquid dignissimos ipsum molestias laboriosam temporibus sunt iusto quasi eaque facere quaerat fugit dolores nam corrupti vel non, nostrum quidem quae. Aspernatur!
        </p>

        <button className='bg-customPurple-default hover:bg-customPurple-hover text-white py-2 px-4'>Register</button>
      </div>

      <div>
        <div></div>
        <span>Event Summary</span>
        <h2></h2>
      </div>
    </div>
  )
}

export default Open