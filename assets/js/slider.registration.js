const registrationSlider = {
    init: () => {
        [...document.querySelectorAll('.registration-slider-inner')].forEach(eachModule => {
            const regSlider = new Swiper(eachModule, {
                slidesPerView: 1,
                effect: 'fade',
                loop: true,
                allowTouchMove: false,
                fadeEffect: {
                    crossFade: true
                },
                autoplay: {
                    delay: 7000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: eachModule.querySelector('.registration-slider-controls'),
                    type: 'bullets',
                    clickable: true,
                },
                autoHeight: true,
            });
            const skipSlide = eachModule.querySelector('.registration-slider__skip-slide');
            if (skipSlide) {
                skipSlide.addEventListener('click', () => {
                    regSlider.slideNext()
                });
            }
        });
    },
}