'use strict';

window.addEventListener('DOMContentLoaded', () => {
  // TABS
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show','fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show','fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // TIMER
  const deadLine = '2200-01-01';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / 1000 / 60 / 60 / 24),
          hours = Math.floor(t / 1000 / 60 / 60 % 24),
          minutes = Math.floor(t / 1000 / 60 % 60),
          seconds = Math.floor(t / 1000 % 60);
    
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadLine);

  // MODAL
  const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

  function openModal() {
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
  }

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal();
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target == modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 5000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

  // САМОСТОЯТЕЛЬНАЯ РАБОТА
  // const modal = document.querySelector('.modal');
  // const modalBtn = document.querySelectorAll('[data-modal]');
  // const closemodalBtn = document.querySelector('[data-close]');

  // modalBtn.forEach( btn => {
  //   btn.addEventListener('click', () => {
  //     modal.style.display = 'block';
  //   });
  // });

  // modal.addEventListener('click', (e) => {
  //   if (e.target.dataset.close == '' || e.target.classList.contains('modal')) {
  //     modal.style.display = 'none';
  //   }
  // });

  // DINAMIC CARDS USING CLASSES
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.classes = classes;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price *= this.transfer;
    }

    render() {
      let element = document.createElement('div');
      if (this.classes.length == 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      
      element.innerHTML = `
        <img src =${this.src} alt = ${this.alt}>
        <h3 class = "menu__item-subtitle" >${this.title}</h3>
        <div class = "menu__item-descr">${this.descr}</div>
        <div class = "menu__item-divider"></div>
        <div class = "menu__item-price">
          <div class = "menu__item-cost"> Цена: </div>
          <div class = "menu__item-total">
            <span>${this.price}</span> грн / день
          </div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  const getResource =  async (url, data) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could nor fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  // getResource('http://localhost:3000/menu')
  // .then(data => {
  //   data.forEach(({img, altImg, title, descr, price}) => {
  //     new MenuCard(img, altImg, title, descr, price, '.menu .container').render();
  //   });
  // });
  
  axios.get('http://localhost:3000/menu')
    .then(data => {
      data.data.forEach(({img, altImg, title, descr, price}) => {
        new MenuCard(img, altImg, title, descr, price, '.menu .container').render();
      });
    });

// ВТОРОЙ ВАРИАНТ getResourse();
  // getResource('http://localhost:3000/menu')
  // .then(data => createCard(data));

  // function createCard(data) {
  //   data.forEach(({img, altImg, title, descr, price}) => {
  //     const element = document.createElement('div');

  //     element.classList.add('menu__item');
  //     const transfer = 27;

  //     element.innerHTML = `
  //     <img src =${img} alt = ${altImg}>
  //     <h3 class = "menu__item-subtitle" >${title}</h3>
  //     <div class = "menu__item-descr">${descr}</div>
  //     <div class = "menu__item-divider"></div>
  //     <div class = "menu__item-price">
  //       <div class = "menu__item-cost"> Цена: </div>
  //       <div class = "menu__item-total">
  //         <span>${price * transfer}</span> грн / день
  //       </div>
  //     </div>
  //     `;

  //     document.querySelector('.menu .container').append(element);
  //   });
  // }


  // САМОСТОЯТЕЛЬНАЯ РАБОТА 
  // const menuField = document.querySelector('.menu__field .container'),
  //       menuList = {};

  // class MenuCard {
  //   constructor(imageURL, imageAlt, menuTitle, menuText, menuPrice) {
  //     this.imageURL = imageURL;
  //     this.imageAlt = imageAlt;
  //     this.menuTitle = menuTitle;
  //     this.menuText = menuText;
  //     this.menuPrice = menuPrice;
  //   }
  // }

  // menuList.fitness = new MenuCard('img/tabs/vegy.jpg','image: vegy', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 229);
  // menuList.premium = new MenuCard('img/tabs/elite.jpg','image: elite', 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 550);
  // menuList.lenten = new MenuCard('img/tabs/post.jpg','image: lenten', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 430);

  // function generateCards() {
  //   for (let menuItem in menuList) {
  //     menuField.innerHTML += `
  //     <div class="menu__item">
  //       <img src="${menuList[menuItem].imageURL}" alt="${menuList[menuItem].imageAlt}">
  //       <h3 class="menu__item-subtitle">${menuList[menuItem].menuTitle}</h3>
  //       <div class="menu__item-descr">${menuList[menuItem].menuText}</div>
  //       <div class="menu__item-divider"></div>
  //       <div class="menu__item-price">
  //         <div class="menu__item-cost"> Цена: </div>
  //         <div class="menu__item-total">
  //           <span>${menuList[menuItem].menuPrice}</span></span> грн/день
  //         </div>
  //       </div>
  //     </div>
  //   `;
  //   }
  // }

  // generateCards();

  // FORMS
  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/forms/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
    bindPostData(item);
  });

  const postData =  async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        'Content-type': 'application/json'
      }
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = ` 
        display: block;
        margin: 0 auto;
        margin-top: 30px;
      `;
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
      .then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.toggle('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.toggle('hide');
      closeModal();
    }, 4000);
  }

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
  const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
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
    const slider = document.querySelector('.offer__slider');
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
  
  // CALCULATOR
  const result = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio;

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    } 

    if (sex === 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }
  
        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
  
        e.target.classList.add(activeClass);
  
        calcTotal();
      });
    });

  }

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
        input.style.boxShadow = '0 4px 15px red';
      } else {
        input.style.border = 'none';
        input.style.boxShadow = '0 4px 15px rgba(0,0,0,.2)';
      }

      switch(input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;

        case 'weight':
          weight = +input.value;
          break;

        case 'age':
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }

  
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
  calcTotal();
  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');

  // САМОСТОЯТЕЛЬНАЯ РАБОТА
  // const resultField = document.querySelector('.calculating__result span'),
  //       inputs = document.querySelectorAll('.calculating__choose input'),
  //       genderBtns = document.querySelectorAll('[data-gender]'),
  //       ratioBtns = document.querySelectorAll('[data-ratio]'),
  //       calculator = document.querySelector('.calculating__field');

  // let result, gender, height, weight, age, ratio;

  // function calculateResult() {
  //   if (gender == 'male') {
  //   result = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
  //   } else if(gender == 'female') {
  //   result = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio); 
  //   }

  //   if (isNaN(result) || height == '' || weight == '' || age == '') {
  //     resultField.textContent = `...  `;
  //   } else {
  //     resultField.textContent = result;
  //   }
  // }

  // resultField.textContent = `...  `;

  // calculator.addEventListener('click', event => {
  //   const t = event.target;

  //   if (t.dataset.gender) {
  //     genderBtns.forEach(btn => {
  //       btn.classList.remove('calculating__choose-item_active');
  //     });
  //     t.classList.add('calculating__choose-item_active');

  //     gender = t.id;

  //     calculateResult();
  //   } else if (t.dataset.ratio) {
  //     ratioBtns.forEach(btn => {
  //       btn.classList.remove('calculating__choose-item_active');
  //     });
  //     t.classList.add('calculating__choose-item_active');

  //     ratio = t.dataset.ratio;

  //     calculateResult();
  //   }
  // });

  // inputs.forEach(inputField => {
  //   inputField.addEventListener('input', () => {
  //     switch(inputField.id) {
  //       case (inputField.id = 'height'):
  //         height = inputField.value;
  //         calculateResult();
  //         break;

  //         case (inputField.id = 'weight'):
  //         weight = inputField.value;
  //         calculateResult();
  //         break;

  //         case (inputField.id = 'age'):
  //         age = inputField.value;
  //         calculateResult();
  //         break;
  //     }
  //   }); 
  // });

  // DEFAULT ЗНАЧЕНИЯ ИЗ ЛОКАЛ СТРОРЕДЖ. САМОСТОЯТЕЛЬНАЯ РАБОТА
  // function setDefaultValues(strVar, defaultValue) {
  //   if (strVar == 'sex') {
  //     if (localStorage.getItem(strVar)) {
  //       sex = localStorage.getItem(strVar);
  //       document.querySelector(`${'#' + `${sex}`}`).classList.add('calculating__choose-item_active');
  //     } else {
  //       sex = defaultValue;
  //       localStorage.setItem(strVar, defaultValue);
  //       document.querySelector(`${'#' + `${defaultValue}`}`).classList.add('calculating__choose-item_active');
  //     }
  //   } else if (strVar == 'ratio') {
  //     if (localStorage.getItem(strVar)) {
  //       ratio = localStorage.getItem(strVar);
  //       document.querySelector(`[data-ratio="${ratio}"]`).classList.add('calculating__choose-item_active');
  //     } else {
  //       ratio = defaultValue;
  //       localStorage.setItem(strVar, defaultValue);
  //       document.querySelector(`[data-ratio="${ratio}"]`).classList.add('calculating__choose-item_active');
  //     }
  //   }
  // }
  // setDefaultValues('sex', 'female');
  // setDefaultValues('ratio', 1.375);

});

