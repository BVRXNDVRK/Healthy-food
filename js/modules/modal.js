function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('hide');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';

  if (modalTimerId) {
    clearInterval(modalTimerId);
  } 
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('show');
  modal.classList.add('hide');
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  // MODAL
  const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });

  modal.addEventListener('click', (e) => {
    if (e.target == modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
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
}

export default modal;
export {closeModal};
export {openModal};