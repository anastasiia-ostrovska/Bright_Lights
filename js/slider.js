// import deviceTypeService from './deviceTypeService.mjs';

// console.log('deviceTypeService.getIsMobile(): ', deviceTypeService.getIsMobile());
// console.log('deviceTypeService.getIsDesktop(): ', deviceTypeService.getIsDesktop());
// console.log('deviceTypeService.getIsTablet(): ', deviceTypeService.getIsTablet());

// const isMobile = deviceTypeService.getIsMobile();
// const isTablet = deviceTypeService.getIsTablet();
// const isDesktop = deviceTypeService.getIsDesktop();

let visibleTicketsCount = 0;
if (document.documentElement.clientWidth < 578) {
  visibleTicketsCount = 1;
} else {
  visibleTicketsCount = 3;
}

// ---- tickets info starts ----
const ticketsInfo = [
  {
    id: 1, location: {
      city: {
        name: 'Chandler, AZ', mapHref: 'https://maps.app.goo.gl/6KZL1sy2qDj96oMi6'
      },
      concertVenue: {
        name: 'The Park at Wild Horse Pass',
        // citeHref: 'https://playatgila.com/entertainment/'
      },
    }, date: {
      year: '2021', month: 'APR', day: '02'
    }, img: {
      src: 'img/6_section_picture_1.png'
    }, ticket: { href: '#' }
  }, {
    id: 2, location: {
      city: {
        name: 'Ibiza, IBZ', mapHref: 'https://maps.app.goo.gl/spuQZuCgTyokweUd8'
      }, concertVenue: {
        name: 'Swag Ibiza Club', citeHref: 'https://swagibizaoficial.com/',
      }
    }, date: {
      year: '2021', month: 'JUL', day: '08'
    }, img: {
      src: 'img/6_section_picture_2.png'
    }, ticket: { href: '#' }

  }, {
    id: 3, location: {
      city: {
        name: 'Ibiza, IBZ', mapHref: 'https://maps.app.goo.gl/QGYEFdgxuovkVcpc6'
      }, concertVenue: {
        name: 'El Swing Ibiza', citeHref: 'https://swing-ibiza.negocio.site/',
      },
    }, date: {
      year: '2021', month: 'APR', day: '02'
    }, img: {
      src: 'img/6_section_picture_3.png'
    }, ticket: { href: '#' }

  }, {
    id: 4, location: {
      city: {
        name: 'Chandler, AZ', mapHref: 'https://maps.app.goo.gl/6KZL1sy2qDj96oMi6'
      }, concertVenue: {
        name: 'The Park at Wild Horse Pass', citeHref: 'https://playatgila.com/entertainment/',
      },
    }, date: {
      year: '2022', month: 'OCT', day: '12'
    }, img: {
      src: 'img/6_section_picture_1.png'
    }, ticket: { href: '#' }
  }, {
    id: 5, location: {
      city: {
        name: 'Ibiza, IBZ', mapHref: 'https://maps.app.goo.gl/spuQZuCgTyokweUd8'
      }, concertVenue: {
        name: 'Swag Ibiza Club', citeHref: 'https://swagibizaoficial.com/',
      }
    }, date: {
      year: '2022', month: 'APR', day: '25'
    }, img: {
      src: 'img/6_section_picture_2.png'
    }, ticket: { href: '#' }
  }, {
    id: 6, location: {
      city: {
        name: 'Ibiza, IBZ', mapHref: 'https://maps.app.goo.gl/QGYEFdgxuovkVcpc6'
      }, concertVenue: {
        name: 'El Swing Ibiza', citeHref: 'https://swing-ibiza.negocio.site/',
      },
    }, date: {
      year: '2022', month: 'MAY', day: '09'
    }, img: {
      src: 'img/6_section_picture_3.png'
    }, ticket: { href: '#' }
  }];
// ---- tickets info ends ----

const activateSlider = (sliderId, ticketsInfo, visibleTicketsCount) => {
  const sliderEl = document.querySelector(sliderId);
  const galleryContainer = sliderEl.querySelector('.gallery-container');
  const galleryList = sliderEl.querySelector('.gallery-list');
  const prevBtn = sliderEl.querySelector('.prev');
  const nextBtn = sliderEl.querySelector('.next');

// ---- adding tickets on page starts ----
  const renderTickets = () => {
    // get general count of tickets:
    const ticketsCount = ticketsInfo.length;

    // add ticket layouts on the page:
    for (let i = 0; i < ticketsCount; i++) {
      const ticketInfo = ticketsInfo[i];
      const ticketContainer = document.createElement('div');
      ticketContainer.classList.add('sec_6_ticket_container', 'ticket-container');
      // TODO: remove links city/concertVenue;
      ticketContainer.innerHTML = `
                <div class="sec_6_photo">
                  <img
                    class="img"
                    src="${ticketInfo.img.src}"
                    alt="concert photo"
                  />
                </div>

                <h5 class="sec_6_tittle">
                <a target="_blank" href="${ticketInfo.location.city.mapHref}" class="city">${ticketInfo.location.city.name}</a>
                  <br />
                  <a target="_blank" href="${ticketInfo.location.concertVenue.citeHref}" 
                  class="concert-venue">${ticketInfo.location.concertVenue.name}</a>
                </h5>

                <div class="sec_6_ticket_bottom">
                  <time>${ticketInfo.date.month} ${ticketInfo.date.day} ${ticketInfo.date.year}</time>

                  <a target="_blank" class="sec_6_button_link" href="${ticketInfo.ticket.href}">
                    <div class="sec_6_button">tickets</div>
                  </a>
                </div>`;
      galleryList.append(ticketContainer);
    }
  };
// ---- adding tickets on page ends ----

// ---- slider functionality starts ----
  const addSliderFunctionality = () => {
// query elements:
    const ticketEl = galleryContainer.querySelector('.ticket-container');
    const prevArrow = prevBtn.querySelector('.arrow');
    const nextArrow = nextBtn.querySelector('.arrow');
    const ticketWidth = ticketEl.offsetWidth;
    const ticketMarginRight = getComputedStyle(ticketEl).marginRight;
    // calc one scroll width:
    const oneSlideScrollWidth = ticketWidth + parseFloat(ticketMarginRight);
    const totalScrollsCount = ticketsInfo.length - visibleTicketsCount;
    // set limits:
    const leftLimit = 0;
    const rightLimit = -parseInt(oneSlideScrollWidth * totalScrollsCount);

    let currentMarginLeft = 0; // початкова позиція каруселі
    let newMarginLeft = 0;

    const setMarginLeft = () => {
      ticketEl.style.marginLeft = `${newMarginLeft}px`;
      currentMarginLeft = newMarginLeft;
    };

    const toggleButtonDisabledClass = (button, arrow) => {
      button.classList.toggle('disabled');
      arrow.classList.toggle('disabled');
    };

    const onPrevBtnCLick = () => {
      // check if no more prev ticket:
      if (parseInt(currentMarginLeft) >= leftLimit) return;

      if (parseInt(currentMarginLeft) <= rightLimit) {
        toggleButtonDisabledClass(nextBtn, nextArrow);
      }

      // set new margin:
      newMarginLeft = currentMarginLeft + oneSlideScrollWidth;
      setMarginLeft();

      if (parseInt(newMarginLeft) >= leftLimit) {
        toggleButtonDisabledClass(prevBtn, prevArrow);
      }
    };

    const onNextBtnCLick = () => {
      // check if no more prev ticket:
      if (parseInt(currentMarginLeft) <= rightLimit) return;

      if (parseInt(currentMarginLeft) >= leftLimit) {
        toggleButtonDisabledClass(prevBtn, prevArrow);
      }

      // set new margin:
      newMarginLeft = currentMarginLeft - oneSlideScrollWidth;
      setMarginLeft();

      if (parseInt(newMarginLeft) <= rightLimit) {
        toggleButtonDisabledClass(nextBtn, nextArrow);
      }
    };

    // ---- swipe slider functionality starts ----
    // set initial x on pointerdown:
    const onPointerDown = (e) => {
      // prevent triggering events on other elements:
      e.currentTarget.setPointerCapture(e.pointerId);

      // remove transition:
      const transition = getComputedStyle(ticketEl).transition;
      ticketEl.style.transition = 'none';

      // get x coordinate:
      let initialPointerX = e.pageX;

      // set new margin el:
      let initialMarginLeft = currentMarginLeft;
      let prevMarginLeft;

      const startSlideMoving = (e) => {
        e.preventDefault();
        // save prev marginLeft value before moving:
        prevMarginLeft = currentMarginLeft;

        // get scroll width:
        const currentX = e.pageX;
        const currentScrollWidth = currentX - initialPointerX;

        // set margin left to move slide:
        newMarginLeft = currentMarginLeft + currentScrollWidth;
        if (newMarginLeft > leftLimit) newMarginLeft = leftLimit;
        if (newMarginLeft < rightLimit) newMarginLeft = rightLimit;
        setMarginLeft();

        // reset initial x:
        initialPointerX = e.pageX;
      };

      const endSlideMoving = () => {
        // return transition value:
        ticketEl.style.transition = transition;

        // get final count of slides to scroll:
        const totalScrollWidth = Math.abs(initialMarginLeft - currentMarginLeft);
        const currentScrollsCount = Math.ceil(totalScrollWidth / oneSlideScrollWidth);
        const finalScrollWidth = currentScrollsCount * oneSlideScrollWidth - totalScrollWidth;

        if (prevMarginLeft > currentMarginLeft) {
          newMarginLeft = currentMarginLeft - finalScrollWidth;
        } else {
          newMarginLeft = currentMarginLeft + finalScrollWidth;
        }

        setMarginLeft();

        document.removeEventListener('pointermove', startSlideMoving);
        document.removeEventListener('pointerup', endSlideMoving);
      };

      // subscribe on pointermove/pointerup:
      document.addEventListener('pointermove', startSlideMoving);
      document.addEventListener('pointerup', endSlideMoving);
    };

    // ---- swipe slider functionality ends ----

    const setInitialSliderState = () => {
      const isPrevBtnDisabled = prevBtn.classList.contains('disabled');
      if (currentMarginLeft === 0 && !isPrevBtnDisabled) {
        toggleButtonDisabledClass(prevBtn, prevArrow);
      }
    };

    const subscribeOnButtonsClick = () => {
      prevBtn.addEventListener('click', onPrevBtnCLick);
      nextBtn.addEventListener('click', onNextBtnCLick);
    };

    const subscribeOnPointerDown = () => {
      galleryContainer.addEventListener('pointerdown', onPointerDown);
      // prevent default browser behavior on dragstart:
      galleryContainer.ondragstart = () => false;
    };

    subscribeOnButtonsClick();
    setInitialSliderState();
    subscribeOnPointerDown();
  };
// ---- slider functionality ends ----

  renderTickets();
  addSliderFunctionality();
};

activateSlider('#tickets-slider', ticketsInfo, visibleTicketsCount);



