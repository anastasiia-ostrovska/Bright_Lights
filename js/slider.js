// import deviceTypeService from './deviceTypeService.mjs';

// console.log('deviceTypeService.getIsMobile(): ', deviceTypeService.getIsMobile());
// console.log('deviceTypeService.getIsDesktop(): ', deviceTypeService.getIsDesktop());
// console.log('deviceTypeService.getIsTablet(): ', deviceTypeService.getIsTablet());

// const isMobile = deviceTypeService.getIsMobile();
// const isTablet = deviceTypeService.getIsTablet();
// const isDesktop = deviceTypeService.getIsDesktop();

const isMobile = document.documentElement.clientWidth < 578;

let visibleTicketsCount = 0;
if (isMobile) {
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
    // TODO: rename ticket to slide etc:
    const ticketElements = galleryContainer.querySelectorAll('.ticket-container');
    const ticketEl = galleryContainer.querySelector('.ticket-container');
    const prevArrow = prevBtn.querySelector('.arrow');
    const nextArrow = nextBtn.querySelector('.arrow');
    // const sliderVisibleWidth =
    const ticketWidth = parseInt(ticketEl.offsetWidth);
    const ticketComputedMarginRight = getComputedStyle(ticketEl).marginRight;
    const oneSlideScrollWidth = ticketWidth + parseInt(ticketComputedMarginRight);
    const totalScrollsCount = ticketElements.length - visibleTicketsCount;
    const slidesToScrollDefaultCount = 1;
    const leftScrollLimit = 0;
    const rightScrollLimit = -(oneSlideScrollWidth * totalScrollsCount);
    const directions = {
      forward: 'forward',
      backward: 'backward',
    };
    let currentScrollWidth = 0;
    let slidesToScrollCurrentCount = 0;
    let currentDirection = '';
    let currentPosition = 0;
    let currentSlideIndex = 0;

    const directionHandler = ({ onForward, onBackward }) => {
      switch (currentDirection) {
        case directions.forward:
          return onForward();
        case directions.backward:
          return onBackward();
        default:
          break;
      }
    };
    const toggleButtonDisabledClass = (button, arrow) => {
      button.classList.toggle('disabled');
      arrow.classList.toggle('disabled');
    };
    const disableButton = () => {
      const isPrevBtnDisabled = prevBtn.classList.contains('disabled');
      const isNextBtnDisabled = nextBtn.classList.contains('disabled');
      directionHandler({
        onForward: () => {
          if (isPrevBtnDisabled) {
            toggleButtonDisabledClass(prevBtn, prevArrow);
          }
          if (currentPosition === rightScrollLimit && !isNextBtnDisabled) {
            toggleButtonDisabledClass(nextBtn, nextArrow);
          }
        },
        onBackward: () => {
          if (isNextBtnDisabled) {
            toggleButtonDisabledClass(nextBtn, nextArrow);
          }
          if (currentPosition === leftScrollLimit && !isPrevBtnDisabled) {
            toggleButtonDisabledClass(prevBtn, prevArrow);
          }
        }
      });
    };
    const calculateNewPosition = () => {
      return directionHandler({
        onForward: () => Math.max((currentPosition - currentScrollWidth), rightScrollLimit),
        onBackward: () => Math.min((currentPosition + currentScrollWidth), leftScrollLimit)
      });
    };
    const setCurrentSlideIndex = () => {
      directionHandler({
        onForward: () => currentSlideIndex += slidesToScrollCurrentCount,
        onBackward: () => currentSlideIndex -= slidesToScrollCurrentCount
      });
    };
    const scrollSlider = () => {
      const x = calculateNewPosition();
      galleryList.style.transform = `translateX(${x}px)`;
      // save x:
      currentPosition = x;
    };
    const onNavigationButtonClick = (direction) => {
      // prevent scroll if on limit:
      directionHandler({
        onForward: () => currentPosition === rightScrollLimit,
        onBackward: () => currentPosition === leftScrollLimit
      });

      currentScrollWidth = oneSlideScrollWidth;
      slidesToScrollCurrentCount = slidesToScrollDefaultCount;
      // set direction and scroll by direction:
      currentDirection = direction;
      scrollSlider();
      // set current index:
      setCurrentSlideIndex();
      // disable button if need:
      disableButton();
    };
    const onPointerDown = (e) => {
      // prevent triggering events on other elements:
      e.currentTarget.setPointerCapture(e.pointerId);

      // remove transition:
      const transition = getComputedStyle(galleryList).transition;
      galleryList.style.transition = 'none';

      // get x coordinate:
      const initialTranslateX = currentPosition;
      const initialPointerX = e.pageX;
      let previousPointerX = initialPointerX;
      let currentPointerX;

      const startSlideMoving = (e) => {
        // prevent from highlighting text:
        e.preventDefault();

        // get scroll width:
        currentPointerX = e.pageX;
        currentScrollWidth = Math.abs(currentPointerX - previousPointerX);

        // get direction:
        currentDirection = currentPointerX > previousPointerX ? directions.backward : directions.forward;
        scrollSlider();

        // reset previous x:
        previousPointerX = currentPointerX;
      };

      const endSlideMoving = (e) => {
        document.removeEventListener('pointermove', startSlideMoving);
        document.removeEventListener('pointerup', endSlideMoving);

        // return transition value:
        galleryList.style.transition = transition;

        // return if didn't move:
        currentPointerX = e.pageX;
        if (currentPointerX === initialPointerX) return;

        // get final count of slides to scroll and width:
        const actualScrollWidth = Math.abs(initialPointerX - currentPointerX);
        const slidesToScrollActualCount = actualScrollWidth / oneSlideScrollWidth;
        const oneSlideScrollThreshold = isMobile ? 0.3 : 0.5;
        const actualScrollThreshold = Math.floor(slidesToScrollActualCount) + oneSlideScrollThreshold;
        const isThresholdPassed = actualScrollThreshold <= slidesToScrollActualCount;

        if (isThresholdPassed) {
          slidesToScrollCurrentCount = Math.ceil(slidesToScrollActualCount);
        } else {
          slidesToScrollCurrentCount = Math.floor(slidesToScrollActualCount);
        }
        currentScrollWidth = slidesToScrollCurrentCount * oneSlideScrollWidth;

        // reset currentX to initial (state before scrolling by pointer):
        currentPosition = initialTranslateX;
        currentDirection = currentPointerX > initialPointerX ? directions.backward : directions.forward;

        scrollSlider();
        setCurrentSlideIndex();
        disableButton();
      };

      // subscribe on pointermove/pointerup:
      document.addEventListener('pointermove', startSlideMoving);
      document.addEventListener('pointerup', endSlideMoving);
    };
    const setInitialSliderState = () => {
      const isPrevBtnDisabled = prevBtn.classList.contains('disabled');
      // if (currentMarginLeft === 0 && !isPrevBtnDisabled) {
      if (!isPrevBtnDisabled) {
        toggleButtonDisabledClass(prevBtn, prevArrow);
      }
    };

    const subscribeOnButtonsClick = () => {
      prevBtn.addEventListener('click', () => onNavigationButtonClick(directions.backward));
      nextBtn.addEventListener('click', () => onNavigationButtonClick(directions.forward));
    };
    const subscribeOnPointerDown = () => {
      galleryContainer.addEventListener('pointerdown', onPointerDown);
      // prevent default browser behavior on dragstart:
      galleryContainer.ondragstart = () => false;
    };

    subscribeOnButtonsClick();
    subscribeOnPointerDown();
    setInitialSliderState();
  };
// ---- slider functionality ends ----

  renderTickets();
  addSliderFunctionality();
};

activateSlider('#tickets-slider', ticketsInfo, visibleTicketsCount);



