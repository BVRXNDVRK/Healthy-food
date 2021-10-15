function calculator() {
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
}

export default calculator;