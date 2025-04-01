'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/a11y';

type CaseStudy = {
  title: string
  content: string
}

export default function CaseStudies({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <div className="relative">
      <Swiper
        style={{
          '--swiper-navigation-color': '#3B9900',
          '--swiper-navigation-size': '24px',
          '--swiper-pagination-color': '#3B9900',
        } as any}
        className="shadow-lg"
        spaceBetween={40} 
        slidesPerView={1} 
        autoHeight={true} 
        navigation={true}
        loop={true}
        pagination={{dynamicBullets: true}}
        a11y={{
          enabled: true,
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
        }}
        modules={[Navigation, Pagination, A11y]}
      >
        {caseStudies.map((caseStudy) => (
          <SwiperSlide
            key={caseStudy.title}
            className="w-full bg-white px-4 sm:px-16 py-4 sm:py-12"
          >
            <div className="w-full flex flex-col md:flex-row gap-6 bg-white p-4 sm:p-12">
              <div className="basis-1/2">
                <h3 className="text-forest text-3xl sm:text-5xl font-title sm:mb-4">{caseStudy.title}</h3>
              </div>
              <div className="basis-1/2">
                <div
                  className="prose text-forest"
                  dangerouslySetInnerHTML={{ __html: caseStudy.content }}
                  />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
} 