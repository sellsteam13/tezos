document.addEventListener('DOMContentLoaded', () => {
    [...document.querySelectorAll('.briefcases-slider')].forEach(eachModule => {
        /** Делаем выборку всех слайдов */
        const allSlides = Array.from(eachModule.querySelectorAll('.briefcase'));
        /** Проверяем минимальное количество слайдов для работы слайдера */
        if (allSlides.length > 1) {
            /** Добавляем необходимые классы для корректной работы слайдера */
            eachModule.classList.add('swiper-wrapper');
            allSlides.map(x => x.classList.add('swiper-slide'));
            /** Создаем слайдер */
            const briefcasesSlider = new Swiper(eachModule.parentNode, {
                slidesPerView: 1,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                navigation: {
                    prevEl: eachModule.parentNode.querySelector('.briefcases-slider__prev'),
                    nextEl: eachModule.parentNode.querySelector('.briefcases-slider__next')
                }
            })
        }
    });
});