import FormPagesIndexCounter from './formPagesIndexCounter.js';

class FormPagesInterface extends FormPagesIndexCounter {
  constructor (formPagesList) {
    super(formPagesList);
  }

  showPage = (index) => {
    this.formPagesList.forEach(page => page.style.display = 'none');
    this.formPagesList[index].style.display = 'grid';
  };
}

export default FormPagesInterface;