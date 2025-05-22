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
        
      <div className=' ml-[10%] mr-[6%]'>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          spaceBetween={20}
          slidesPerView={4}  // Show 4 slides per view
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          className='flex mt-10'
        >
          <SwiperSlide className='flex justify-center'>
            <img src={slider1} alt="Slide 1" className="w-50 h-80  rounded-lg" />
          </SwiperSlide>
          <SwiperSlide className='flex justify-center'>
            <img src={slider2} alt="Slide 2" className="w-50 h-80 rounded-lg" />
          </SwiperSlide>
          <SwiperSlide className='flex justify-center'>
            <img src={slider3} alt="Slide 3" className="w-50 h-80 rounded-lg" />
          </SwiperSlide>
          <SwiperSlide className='flex justify-center'>
            <img src={slider4} alt="Slide 4" className="w-50 h-80 rounded-lg" />
          </SwiperSlide>
          <SwiperSlide className='flex justify-center'>
            <img src={slider5} alt="Slide 5" className="w-50 h-80 rounded-lg" />
          </SwiperSlide>
          <SwiperSlide className='flex justify-center'>
            <img src={slider6} alt="Slide 6" className="w-50 h-80 rounded-lg" />
          </SwiperSlide>
          <SwiperSlide className='flex justify-center'>
            <img src={slider7} alt="Slide 7" className="w-50 h-80 rounded-lg" />
          </SwiperSlide>
          <SwiperSlide className='flex justify-center'>
            <img src={slider8} alt="Slide 8" className="w-50 h-80 rounded-lg" />
          </SwiperSlide>
          <SwiperSlide className='flex justify-center'>
            <img src={slider9} alt="Slide 9" className="w-50 h-80 rounded-lg" />
          </SwiperSlide>
          <SwiperSlide className='flex justify-center'>
            <img src={slider10} alt="Slide 10" className="w-50 h-80 rounded-lg" />
          </SwiperSlide>
        </Swiper>
      </div>
    );
}

export default Slider;
