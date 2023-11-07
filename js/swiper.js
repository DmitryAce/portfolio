const swiper = new Swiper('.swiper', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 3,
      spaceBetween: 30,
      simulateTouch: false,
      autoplay: {
        delay: 1500,
        stopOnLastSlide: false,
        disableOnInteraction: true,
      },
      breakpoints: {
        320: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1023: {
            slidesPerView: 3,
        },

      }
  });