class Modal {
  constructor ({ modalElSelector, openBtnSelector, closeBtnSelector }) {
    this.modalElement = document.querySelector(modalElSelector);
    this.openBtnList = document.querySelectorAll(openBtnSelector);
    this.closeBtnList = document.querySelectorAll(closeBtnSelector);

    this.addOpenEventListener();
    this.addCloseEventListener();
  }

  addOpenEventListener = () => {
    this.openBtnList.forEach(btn => {
      btn.addEventListener('click', () => {
        this.modalElement.showModal();
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
    this.modalElement.addEventListener('mousedown', (event) => {
      if (event.target === this.modalElement) {
        this.modalElement.close();
      }
    });
  };
}

const ticketModal = new Modal({
  modalElSelector: '#modal_tickets',
  openBtnSelector: '.show_modal_btn',
  closeBtnSelector: '.close_modal_btn'
});
