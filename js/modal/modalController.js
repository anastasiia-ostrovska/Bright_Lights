class ModalController {
  constructor ({ modalInterface, openBtnList, closeBtnList, handlePageScrolling }) {
    this.modalInterface = modalInterface;
    this.openBtnList = openBtnList;
    this.closeBtnList = closeBtnList;
    this.handlePageScrolling = handlePageScrolling;
  }

  addOpenEventListener = () => {
    this.openBtnList.forEach(btn => {
      btn.addEventListener('click', (event) => {
        this.modalInterface.openModal(this.handlePageScrolling);
      });
    });
  };
  addCloseEventListener = (callback) => {
    // close on closeBtn click:
    this.closeBtnList.forEach(btn => {
      btn.addEventListener('click', () => {
        this.modalInterface.closeModal(this.handlePageScrolling);
      });
    });
    // close on click outside the modal content;
    this.modalInterface.modalElement.addEventListener('pointerdown', (event) => {
      if (event.target === this.modalInterface.modalElement) {
        this.modalInterface.closeModal(this.handlePageScrolling);
      }
    });
  };

  init = () => {
    this.addOpenEventListener();
    this.addCloseEventListener();
  };
}

export default ModalController;
