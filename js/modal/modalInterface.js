class ModalInterface {
  constructor (modalElement) {
    this.modalElement = modalElement;
  }

  openModal = (handlePageScrolling) => {
    this.modalElement.showModal();

    if (typeof handlePageScrolling === 'function') {
      handlePageScrolling(this.modalElement);
    }
  };

  closeModal = (handlePageScrolling) => {
    this.modalElement.close();

    if (typeof handlePageScrolling === 'function') {
      handlePageScrolling(this.modalElement);
    }
  };
}

export default ModalInterface;
