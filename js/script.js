'use strict';

import tabs from './modules/tabs';
import forms from './modules/forms';
import modal from './modules/modal.js';
import timer from './modules/timer';
import cards from './modules/cards';
import calculator from './modules/calculator';
import slider from './modules/slider';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 5000);

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  modal('[data-modal]', '.modal', modalTimerId);
  cards();
  forms('form', modalTimerId);
  timer('.timer', '2200-01-01');
  slider({
    container: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
  calculator();
});