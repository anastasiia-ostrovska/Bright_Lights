export const renderSlides = (slidesInfo, galleryList) => {
  // get general count of slides:
  const slidesCount = slidesInfo.length;

  // add slide layouts on the page:
  for (let i = 0; i < slidesCount; i++) {
    const slideInfo = slidesInfo[i];
    const slideContainer = document.createElement('div');
    slideContainer.classList.add('sec_6_ticket_container', 'ticket-container');
    slideContainer.innerHTML = `
                <div class="sec_6_photo">
                  <img
                    class="img"
                    src="${slideInfo.img.src}"
                    alt="concert photo"
                  />
                </div>

                <h5 class="sec_6_tittle">
                <p class="city">${slideInfo.location.city.name}</p>
                  <br />
                  <p class="concert-venue">${slideInfo.location.concertVenue.name}</p>
                </h5>

                <div class="sec_6_ticket_bottom">
                  <time>${slideInfo.date.month} ${slideInfo.date.day} ${slideInfo.date.year}</time>
                  <button class="sec_6_button modal_show_btn">tickets</button>
                </div>`;
    galleryList.append(slideContainer);
  }
};
