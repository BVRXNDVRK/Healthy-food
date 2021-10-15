import {getResource} from '../services/services';

function cards() {
  // DYNAMIC CARDS USING CLASSES
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
}

export default cards;