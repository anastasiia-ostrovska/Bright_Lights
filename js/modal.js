class Modal {
  constructor ({ modalElSelector, openBtnSelector, closeBtnSelector }) {
    this.modalElement = document.querySelector(modalElSelector);
    this.openBtnList = document.querySelectorAll(openBtnSelector);
    this.closeBtnList = document.querySelectorAll(closeBtnSelector);

    this.addOpenEventListener();
    this.addCloseEventListener();
  }

  handlePageScrolling = (preventPageScrolling = true) => {
    if (preventPageScrolling) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  onOpen = () => {
    this.modalElement.showModal();
    this.handlePageScrolling();
  };
  onCLose = () => {
    this.modalElement.close();
    this.handlePageScrolling(false);
  };
  addOpenEventListener = () => {
    this.openBtnList.forEach(btn => {
      btn.addEventListener('click', () => {
        this.onOpen();
      });
    });
  };
  addCloseEventListener = () => {
    // close on closeBtn click:
    this.closeBtnList.forEach(btn => {
      btn.addEventListener('click', () => {
        this.onCLose();
      });
    });
    // close on click outside the modal content;
    this.modalElement.addEventListener('pointerdown', (event) => {
      if (event.target === this.modalElement) {
        this.onCLose();
      }
    });
  };
}

const ticketModal = new Modal({
  modalElSelector: '#modal_dialog_container',
  openBtnSelector: '.show_modal_btn',
  closeBtnSelector: '.modal_show_btn'
});
