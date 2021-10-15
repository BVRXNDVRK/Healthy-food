function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  // SLIDER
  // ПЕРВЫЙ СПОСОБ
  // const slides = document.querySelectorAll('.offer__slide'),
  //       prev = document.querySelector('.offer__slider-prev'),
  //       next = document.querySelector('.offer__slider-next'),
  //       total = document.querySelector('#total'),
  //       current = document.querySelector('#current');
  // let slideIndex = 1;

  // showSlides(1);

  // if (slides.length < 10) {
  //   total.textContent = `0${slides.length}`;
  // } else {
  //   total.textContent = slides.length;
  // }

  // function showSlides(n) {
  //   if (n > slides.length) {
  //     slideIndex = 1;
  //   }

  //   if (n < 1) {
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach(item => item.style.display = 'none');

  //   slides[slideIndex-1].style.display = 'block';

  //   if (slides.length < 10) {
  //     current.textContent = `0${slideIndex}`;
  //   } else {
  //     current.textContent = slideIndex;
  //   }
  // }

  // function plusSlides(n) {
  //   showSlides(slideIndex += n);
  // }

  // next.addEventListener('click', () => {
  //   plusSlides(1);
  // });

  // prev.addEventListener('click', () => {
  //   plusSlides(-1);
  // });

  // ВТОРОЙ СПОСОБ
  const slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1,
      offset = 0;

  function generateCurrentSlide() {
    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function moveSlider() {
    slidesField.style.transform = `translateX(-${offset}px)`;
  }

  function cutLetters(item) {
    return +item.replace(/\D/g, '');
  }

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex'; 
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  next.addEventListener('click', () => {
    if (offset === cutLetters(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += cutLetters(width);
    }

    moveSlider();

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    generateCurrentSlide();
  });

  prev.addEventListener('click', () => {
    if (offset === 0) {
      offset = cutLetters(width) * (slides.length - 1);
    } else {
      offset -= cutLetters(width);
    }

    moveSlider();

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    generateCurrentSlide();
  });

  
  // САМОСТОЯТЕЛЬНАЯ РАБОТА
  // 1-Й СПОСОБ
  // const prevBtn = document.querySelector('.offer__slider-prev'),
  //       nextBtn = document.querySelector('.offer__slider-next'),
  //       counterCurrent = document.querySelector('#current'),
  //       counterTotal = document.querySelector('#total'),
  //       slider = document.querySelector('.offer__slide'),
  //       slides = [
  //         {src: 'img/slider/food-12.jpg', alt: 'image: food'},
  //         {src: 'img/slider/olive-oil.jpg', alt: 'image: oil'},
  //         {src: 'img/slider/pepper.jpg', alt: 'image: pepper'},
  //         {src: 'img/slider/paprika.jpg', alt: 'image: paprika'}
  //       ];
  // let slidesCount = 0,
  //     currentSlide = 1;
  
  // function changeSlide(slideNumber) {
  //   slider.innerHTML = `
  //     <img src="${slides[slideNumber - 1].src}" alt="${slides[slideNumber - 1].alt}">
  //   `;
  //   const slideImg = document.querySelector('.offer__slide img');
  //   let opa = 0;
  //   slideImg.style.opacity = opa;

  //   setInterval(() => {
  //     if (opa != 1) {
  //       opa = opa + 0.1;
  //       slideImg.style.opacity = opa;
  //     }
  //   }, 24);
  // }

  // function changeSlideNumber() {
  //   if ( currentSlide < 10 ) {
  //     counterCurrent.textContent = `0${currentSlide}`;
  //   } else {
  //     counterCurrent.textContent = currentSlide;
  //   }
  // }
  // changeSlideNumber();

  // for (let slide of slides) {
  //   slidesCount++;
  // }

  // if ( slidesCount < 10 ) {
  //   counterTotal.textContent = `0${slidesCount}`;
  // } else {
  //   counterTotal.textContent = slidesCount;
  // }

  // slider.innerHTML = `
  //   <img src="${slides[0].src}" alt="${slides[0].alt}">
  // `;

  // nextBtn.addEventListener('click', () => {
  //   if (currentSlide < slidesCount) {
  //     currentSlide++;
  //     changeSlideNumber();
  //     changeSlide(currentSlide);
  //   }
  // });

  // prevBtn.addEventListener('click', () => {
  //   if (currentSlide > 1) {
  //     currentSlide--;
  //     changeSlideNumber();
  //     changeSlide(currentSlide);
  //   }
  // });
  
  // 2-Й СПОСОБ
  // const prevBtn = document.querySelector('.offer__slider-prev'),
  //       nextBtn = document.querySelector('.offer__slider-next'),
  //       counterCurrent = document.querySelector('#current'),
  //       counterTotal = document.querySelector('#total'),
  //       slider = document.querySelector('.offer__slider-wrapper'),
  //       slides = [
  //         {src: 'img/slider/food-12.jpg', alt: 'image: food'},
  //         {src: 'img/slider/olive-oil.jpg', alt: 'image: oil'},
  //         {src: 'img/slider/pepper.jpg', alt: 'image: pepper'},
  //         {src: 'img/slider/paprika.jpg', alt: 'image: paprika'}
  //       ];
  // let slidesCount = 0,
  //     currentSlide = 1,
  //     dist = 0;

  // function changeSlideNumber() {
  //   if ( currentSlide < 10 ) {
  //     counterCurrent.textContent = `0${currentSlide}`;
  //   } else {
  //     counterCurrent.textContent = currentSlide;
  //   }
  // }
  // changeSlideNumber();

  // for (let slide of slides) {
  //   slidesCount++;
  // }

  // if ( slidesCount < 10 ) {
  //   counterTotal.textContent = `0${slidesCount}`;
  // } else {
  //   counterTotal.textContent = slidesCount;
  // }

  // slider.innerHTML = '';
  // slider.style.cssText = `
  //   display: flex;
  //   overflow: hidden;
  // `;
  // for (let i = 0; i < slidesCount; i++) {
  //   slider.innerHTML += `
  //   <div class="offer__slide">
  //     <img src="${slides[i].src}" alt="${slides[i].alt}">
  //   </div>  
  // `;
  // }

  // const allSlides = document.querySelectorAll(`.${slider.classList[0]} img`);
  // allSlides.forEach(image => {
  //   image.style.width = "650px";
  // });

  // nextBtn.addEventListener('click', () => {
  //   if (currentSlide < slidesCount) {
  //     currentSlide++;
  //     changeSlideNumber();
  //     dist += 650;
  //     for (let i = 0; i < slidesCount; i++) {
  //       allSlides[i].style.cssText = `
  //       width: 650px;
  //       transition: transform 0.3s linear;
  //       transform: translateX(-${dist}px);
  //     `;
  //     }
  //   }
  // });

  // prevBtn.addEventListener('click', () => {
  //   if (currentSlide > 1) {
  //     currentSlide--;
  //     changeSlideNumber();
  //     dist -= 650;
  //     for (let i = 0; i < slidesCount; i++) {
  //       allSlides[i].style.cssText = `
  //       width: 650px;
  //       transition: transform 0.3s linear;
  //       transform: translateX(-${dist}px);
  //     `;
  //     }
  //   }
  // });

  // SLIDES NAVIGATION
    const slider = document.querySelector(container);
    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    const dots = [];

    function makeDotActive() {
      dots.forEach(dot => dot.style.opacity = 0.5);
      dots[slideIndex - 1].style.opacity = 1;
    }

    for(let i = 0; i < slides.length; i++ ) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.classList.add('dot');
      
      if (i == 0) {
        dot.style.opacity = 1;
      }

      indicators.append(dot);
      dots.push(dot);
    }

    next.addEventListener('click', () => {
      makeDotActive();
    });

    prev.addEventListener('click', () => {
      makeDotActive();
    });

    dots.forEach(dot => {
      dot.addEventListener('click', event => {
        const slideTo = event.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = cutLetters(width) * (slideIndex - 1);
        
        moveSlider();
        makeDotActive();
        generateCurrentSlide();
      });
    });

  // САМОСТОЯТЕЛЬНАЯ РАБОТА
  // const slider = document.querySelector('.offer__slider');

  // slider.style.position = 'relative';

  // let slidesNavBar = document.createElement('div');
  // slidesNavBar.classList.add('carousel-indicators');
  // slider.insertAdjacentElement('beforeend', slidesNavBar);
  // slidesNavBar = document.querySelector('.carousel-indicators');

  // slides.forEach((slide, index) => {
  //   slidesNavBar.innerHTML += `
  //     <div class="dot" data-slide="${index+1}"></div>
  //   `;
  // });

  // const dots = document.querySelectorAll('.dot');

  // slider.addEventListener('click', e => {
  //   const target = e.target;

  //   if (target.classList.contains('dot')) {
  //     slideIndex = target.dataset.slide;
  //     offset = width.slice(0, width.length - 2) * (slideIndex - 1);
      
  //     slidesField.style.transform = `translateX(-${offset}px)`;

  //     if (slides.length < 10) {
  //       current.textContent = `0${slideIndex}`;
  //     } else {
  //       current.textContent = slideIndex;
  //     }

  //     dots.forEach(dot => {
  //       dot.style.opacity = 0.5;
  //     });

  //   dots[slideIndex - 1].style.opacity = 1;
  //   }
  // });

  // dots[slideIndex - 1].style.opacity = 1;

  // next.addEventListener('click', () => {
  //   dots.forEach(dot => {
  //     dot.style.opacity = 0.5;
  //   });
    
  //   dots[slideIndex - 1].style.opacity = 1;
  // });
  
  // prev.addEventListener('click', () => {
  //   dots.forEach(dot => {
  //     dot.style.opacity = 0.5;
  //   });

  //   dots[slideIndex - 1].style.opacity = 1;
  // });
}

export default slider;