class Modal {
  constructor ({ modalElSelector, openBtnSelector, closeBtnSelector }) {
    this.modalElement = document.querySelector(modalElSelector);
    this.openBtnList = document.querySelectorAll(openBtnSelector);
    this.closeBtnList = document.querySelectorAll(closeBtnSelector);

    this.addOpenEventListener();
    this.addCloseEventListener();
  }

  handlePageScrolling = (event) => {
    if (event.type === 'close') {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  };

  open = (event) => {
    this.modalElement.showModal();
    this.handlePageScrolling(event);
  };

  addOpenEventListener = () => {
    this.openBtnList.forEach(btn => {
      btn.addEventListener('click', (event) => {
        this.open(event);
      });
    });
  };
  addCloseEventListener = () => {
    // close on closeBtn click:
    this.closeBtnList.forEach(btn => {
      btn.addEventListener('click', () => {
        this.modalElement.close();
      });
    });
    // close on click outside the modal content;
    this.modalElement.addEventListener('pointerdown', (event) => {
      if (event.target === this.modalElement) {
        this.modalElement.close();
      }
    });
    // return scrolling on close:
    this.modalElement.addEventListener('close', (event) => {
      this.handlePageScrolling(event);
    });
  };
}

const ticketModal = new Modal({
  modalElSelector: '#modal_dialog_container',
  openBtnSelector: '.modal_show_btn',
  closeBtnSelector: '.modal_close_btn'
});
