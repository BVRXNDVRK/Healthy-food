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

  new MenuCard(
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
    'menu__item'
  ).render();

  new MenuCard(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн <br>упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты -<br> ресторанное меню без похода в ресторан!',
    12,
    '.menu .container',
    'menu__item'
  ).render();

  new MenuCard(
    'img/tabs/post.jpg',
    'lenten',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    11,
    '.menu .container',
    'menu__item'
  ).render();

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
    postData(item);
  });

  function postData(form) {
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

      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });

      fetch('server.php', {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
          'Content-type': 'application/json'
        }
      }).then(data => data.text())
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
});
