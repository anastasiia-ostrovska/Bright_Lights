import ModalController from './modalController.js';

const handlePageScrolling = (modal) => {
  if (modal.open) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
};

// query modal element and open/close buttons:
const formModalEl = document.querySelector('#modal_dialog_container');
const openBtnList = document.querySelectorAll('.modal_show_btn');
const closeBtnList = document.querySelectorAll('.modal_close_btn');

const formModalController = new ModalController({
  modalElement: formModalEl,
  openBtnList,
  closeBtnList,
  handlePageScrolling,
});

formModalController.init();