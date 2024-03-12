export class FormStepsState {
  constructor () {
    this._btnController = null;
  }

  setBtnController (controller) {
    this._btnController = controller;
  }

  get btnController () {
    return this._btnController;
  }
}

