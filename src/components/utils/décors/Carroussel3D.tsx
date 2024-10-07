import '@/styles/Carroussel3D.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { ReactNode } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

interface Carroussel3DProps {
    slides: ReactNode[];  // Une liste de nœuds React à afficher dans le Swiper
}

export default function Carroussel3D({ slides }: Carroussel3DProps) {
    return (
        <div className="container">
            <h1 className="heading">Flower Gallery</h1>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
            >
                {/* Rendu dynamique des slides à partir des props */}
                {slides.map((item, index) => (
                    <SwiperSlide key={index}>
                        {item}
                    </SwiperSlide>
                ))}

                <div className="slider-controler">
                    <div className="swiper-pagination"></div>
                </div>
            </Swiper>
        </div>
    );
}
