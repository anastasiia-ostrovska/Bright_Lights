import ModalInterface from './modalInterface.js';

class ModalController extends ModalInterface {
  constructor ({ modalElement, openBtnList, closeBtnList, handlePageScrolling }) {
    super(modalElement);
    this.openBtnList = openBtnList;
    this.closeBtnList = closeBtnList;
    this.handlePageScrolling = handlePageScrolling;
  }

  addOpenEventListener = () => {
    this.openBtnList.forEach(btn => {
      btn.addEventListener('click', (event) => {
        this.openModal(this.handlePageScrolling);
      });
    });
  };
  addCloseEventListener = (callback) => {
    // close on closeBtn click:
    this.closeBtnList.forEach(btn => {
      btn.addEventListener('click', (event) => {
        this.closeModal(this.handlePageScrolling);
      });
    });
    // close on click outside the modal content;
    this.modalElement.addEventListener('pointerdown', (event) => {
      if (event.target === this.modalElement) {
        this.closeModal(this.handlePageScrolling);
      }
    });
  };

  init = () => {
    this.addOpenEventListener();
    this.addCloseEventListener();
  };
}

export default ModalController;
