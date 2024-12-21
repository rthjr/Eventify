// components/AutoSwiper.js
"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const AutoSwiper = () => {
    return (
        <div className='w-full '>
            <div className='w-10/12 m-auto h-96'>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper h-96"
                >
                    <SwiperSlide>
                        <img src="https://images.unsplash.com/photo-1720048170996-40507a45c720?q=80&w=1913&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="event image" className='m-auto h-full rounded-xl' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/assets/banner/upcomingEvent.jpg" alt="event image" className='m-auto h-full rounded-xl' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/assets/banner/conferenceBanner.jpg" alt="event image" className='m-auto h-full rounded-xl' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/assets/banner/sportBanner.jpg" alt="event image" className='m-auto h-full rounded-xl' />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default AutoSwiper;