import { toggleClassName } from '../utils/stylesUtils.js';
import { getIsXIndex } from '../utils/indexUtils.js';
import FormStepsBtnController from './formStepsBtnController.js';
import { openBtnList } from '../modal/index.js';

export const createFormStepControllerOnOpen = ({
  openBtnList,
  formStepState,
  formStepsList,
  prevBtn,
  nextBtn,
  hiddenClassName
}) => {
  openBtnList.forEach(btn => btn.addEventListener('click', (event) => {
    const formStepsBtnController = new FormStepsBtnController({
      formStepsList,
      prevBtn,
      nextBtn,
      hiddenClassName
    });
    formStepsBtnController.init();
    formStepState.setBtnController(formStepsBtnController);
  }));
};

export const removeFormStepControllerOnCLose = ({ modalElement, formStepState }) => {
  modalElement.addEventListener('close', (event) => {
    formStepState.setBtnController(null);
  });
};

export const handlePrevBtnVisibilityOnBtnClick = ({ formStepState, prevBtn, nextBtn, hiddenClassName }) => {
  nextBtn.addEventListener('click', (event) => {
    const isFirstStep = getIsXIndex(formStepState.btnController.stepIndex, 0);
    const isPrevBtnHidden = formStepState.btnController.prevBtn.classList.contains(hiddenClassName);

    if (isFirstStep && isPrevBtnHidden) {
      toggleClassName(prevBtn, hiddenClassName);
    }
  });

  prevBtn.addEventListener('click', (event) => {
    const isSecondStep = getIsXIndex(formStepState.btnController.stepIndex, 1);
    const isPrevBtnHidden = prevBtn.classList.contains(hiddenClassName);

    if (isSecondStep && !isPrevBtnHidden) {
      toggleClassName(prevBtn, hiddenClassName);
    }
  });
};

export const setTicketInfoOnOpen = ({ ticketInfoState, ticketsInfo, openBtnList }) => {
  openBtnList.forEach((btn, index) => btn.addEventListener('click', (event) => {
    const info = ticketsInfo[index];
    ticketInfoState.setTicketInfo(info);
  }));
};

export const renderPricesOnOpen = ({ ticketInfoState, priceFan1El, priceFan2El, openBtnList }) => {
  openBtnList.forEach(btn => btn.addEventListener('click', (event) => {
    const prices = ticketInfoState.ticketInfo.price;
    priceFan1El.innerHTML = prices.FAN1;
    priceFan2El.innerHTML = prices.FAN2;
  }));
};

export const resetTicketsQuantityOnClose = ({ modalElement, quantityCounterList }) => {
  modalElement.addEventListener('close', (event) => {
    quantityCounterList.forEach(counter => counter.value = 0);
  });
};





