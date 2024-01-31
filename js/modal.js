const modal = document.querySelector('.modal_tickets');
const showModalBtnList = document.querySelector('.show_modal_btn');
const closeModalBtn = document.querySelector('.close_modal_btn');

// showModalBtnList.forEach(btn => {
//   btn.addEventListener('click', () => {
//     modal.showModal();
//   });
// });
showModalBtnList.addEventListener('click', () => {
  modal.showModal();
});
closeModalBtn.addEventListener('click', () => {
  modal.close();
});