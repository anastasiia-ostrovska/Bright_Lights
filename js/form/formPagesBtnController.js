import FormPagesInterface from './formPagesInterface.js';

class FormPagesBtnController extends FormPagesInterface {
  constructor ({ formPagesList, prevBtn, nextBtn }) {
    super(formPagesList);
    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;
  }

  onPrevBtnClick = () => {
    this.decreaseIndex();
    this.showPage(this.pageIndex);
  };

  onNextBtnClick = () => {
    this.increaseIndex();
    this.showPage(this.pageIndex);
  };

  init = (handleBtnStyles) => {
    this.prevBtn.addEventListener('click', (event) => {
      this.onPrevBtnClick(handleBtnStyles);
    });
    this.nextBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.onNextBtnClick(handleBtnStyles);
    });
  };
}

export default FormPagesBtnController;