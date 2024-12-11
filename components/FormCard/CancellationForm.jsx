import BackButton from '@components/Button/BackButton'
import Button from '@components/Button/Button'
import React from 'react'

const CancellationForm = () => {
  return (
    <div className='w-full h-full'>
        <div className='m-auto w-28 h-28 lg:w-1/4 lg:h-1/4 flex flex-col gap-8 shadow-xl bg-gray-100 p-4 rounded-lg'>
            <h2 className='font-bold text-xl text-center'>Cancellation Ticket</h2>
            
            <div className='flex flex-col gap-8'>
                <span className='font-bold text-lg'>Policy</span>
                <p>A refund can be issued within 24 hours after the ticket booking process is completed, with 80% of the amount refunded.</p>
                <u>After 24 hours, a refund cannot be processed.</u>

                <dir className= "w-full flex justify-between">
                    <BackButton
                        param = "Go Back"
                    />

                    <Button
                        param = "Refund"
                    />
                </dir>
            </div>
        </div>
    </div>
  )
}

export default CancellationForm