export class TicketInfoState {
  constructor () {
    this._ticketInfo = {};
  }

  setTicketInfo (info) {
    this._ticketInfo = info;
  }

  get ticketInfo () {
    return this._ticketInfo;
  }
}