class FormPagesIndexCounter {
  constructor (formPagesList) {
    this.formPagesList = formPagesList;
    this.pageIndex = 0;
  }

  increaseIndex = () => {
    const pagesCount = this.formPagesList.length;
    if (this.pageIndex < pagesCount - 1) {
      this.pageIndex++;
    }
  };

  decreaseIndex = () => {
    if (this.pageIndex > 0) {
      this.pageIndex--;
    }
  };
}

export default FormPagesIndexCounter;