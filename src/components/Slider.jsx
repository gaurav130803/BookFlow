import { Navigation, Autoplay, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Import images
import slider1 from '../images/slider1.jpg';
import slider2 from '../images/slider2.jpg';
import slider3 from '../images/slider3.jpg';
import slider4 from '../images/slider4.jpg';
import slider5 from '../images/slider5.jpg';
import slider6 from '../images/slider6.jpg';
import slider7 from '../images/slider7.jpg';
import slider8 from '../images/slider8.jpg';
import slider9 from '../images/slider9.jpg';
import slider10 from '../images/slider10.jpg';

function Slider() {
  return (
    <div className='ml-[10%] mr-[6%]'>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className='flex mt-10'
      >
        {[slider1, slider2, slider3, slider4, slider5, slider6, slider7, slider8, slider9, slider10].map((img, index) => (
          <SwiperSlide key={index} className='flex justify-center'>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-40 h-56 sm:w-44 sm:h-64 md:w-50 md:h-80 rounded-lg object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
