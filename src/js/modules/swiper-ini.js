const swiperWorksOptions = {
  lazy: true,
  autoplay: {
    //autoplay
    delay: 2000,
  },

  // freeMode: true,
  pagination: {
    el: ".swiper-pagination-first",
    type: "bullets",
    clickable: true,
  },
  breakpoints: {
    758: {
      slidesPerView: 2.5,
      spaceBetween: 30,
    },
    315: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
  },
};

const swiperReviewsOptions = {
  autoplay: {
    //autoplay
    delay: 3500,
  },

  freeMode: true,
  pagination: {
    el: ".swiper-pagination-second",
    type: "bullets",
    clickable: true,
  },
  breakpoints: {
    970: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    570: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    315: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  },
};

try {
  const swiper = new Swiper(".first-carousel", swiperWorksOptions);
  const swiperSecond = new Swiper(".second-carousel", swiperReviewsOptions);
} catch (e) {
  console.log("Невозможно инициализировать Swiper");
}
