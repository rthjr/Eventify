// components/AutoSwiper.js
"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const AutoSwiper = () => {
    return (
        <div className='w-full'>
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
                    className="mySwiper h-full"
                >
                    <SwiperSlide className="h-full">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1661512457461-86b513bb485f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="event image"
                            className="m-auto h-full w-full object-cover rounded-xl"
                        />
                    </SwiperSlide>
                    <SwiperSlide className="h-full">
                        <img
                            src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="event image"
                            className="m-auto h-full w-full object-cover rounded-xl"
                        />
                    </SwiperSlide>
                    <SwiperSlide className="h-full">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1661868906940-5d8443acf49e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="event image"
                            className="m-auto h-full w-full object-cover rounded-xl"
                        />
                    </SwiperSlide>
                    <SwiperSlide className="h-full">
                        <img
                            src="https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="event image"
                            className="m-auto h-full w-full object-cover rounded-xl"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default AutoSwiper;
