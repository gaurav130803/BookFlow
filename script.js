

import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs'

var swiper = new Swiper('.swiper', {
    
    slidesPerView: 4,
    spaceBetween: 30,

  autoplay :{
      delay :3000,
      disableOnInteraction : false,
  },
  
     
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });


  var swiper = new Swiper('.swiper2', {
    
    slidesPerView: 4,
    spaceBetween: 30,

  autoplay :{
      delay :3000,
      disableOnInteraction : false,
  },
  
     
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });