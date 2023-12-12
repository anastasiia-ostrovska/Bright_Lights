// import deviceTypeService from './deviceTypeService.mjs';

// console.log('deviceTypeService.getIsMobile(): ', deviceTypeService.getIsMobile());
// console.log('deviceTypeService.getIsDesktop(): ', deviceTypeService.getIsDesktop());
// console.log('deviceTypeService.getIsTablet(): ', deviceTypeService.getIsTablet());

// const isMobile = deviceTypeService.getIsMobile();
// const isTablet = deviceTypeService.getIsTablet();
// const isDesktop = deviceTypeService.getIsDesktop();

const isMobile = document.documentElement.clientWidth < 578;

let visibleSlidesCount = 0;
if (isMobile) {
  visibleSlidesCount = 1;
} else {
  visibleSlidesCount = 3;
}

// ---- slides info starts ----
const slidesInfo = [
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
// ---- slides info ends ----

const activateSlider = (sliderId, slidesInfo, visibleSlidesCount) => {
  const sliderEl = document.querySelector(sliderId);
  const galleryContainer = sliderEl.querySelector('.gallery-container');
  const galleryList = sliderEl.querySelector('.gallery-list');

// ---- adding slides on page starts ----
  const renderSlides = () => {
    // get general count of slides:
    const slidesCount = slidesInfo.length;

    // add slide layouts on the page:
    for (let i = 0; i < slidesCount; i++) {
      const slideInfo = slidesInfo[i];
      const slideContainer = document.createElement('div');
      slideContainer.classList.add('sec_6_ticket_container', 'ticket-container');
      // TODO: remove links city/concertVenue;
      slideContainer.innerHTML = `
                <div class="sec_6_photo">
                  <img
                    class="img"
                    src="${slideInfo.img.src}"
                    alt="concert photo"
                  />
                </div>

                <h5 class="sec_6_tittle">
                <a target="_blank" href="${slideInfo.location.city.mapHref}" class="city">${slideInfo.location.city.name}</a>
                  <br />
                  <a target="_blank" href="${slideInfo.location.concertVenue.citeHref}" 
                  class="concert-venue">${slideInfo.location.concertVenue.name}</a>
                </h5>

                <div class="sec_6_ticket_bottom">
                  <time>${slideInfo.date.month} ${slideInfo.date.day} ${slideInfo.date.year}</time>

                  <a target="_blank" class="sec_6_button_link" href="${slideInfo.ticket.href}">
                    <div class="sec_6_button">tickets</div>
                  </a>
                </div>`;
      galleryList.append(slideContainer);
    }
  };
// ---- adding slides on page ends ----

// ---- slider functionality starts ----
  const addSliderFunctionality = () => {
    // query elements:
    const slides = galleryContainer.querySelectorAll('.ticket-container');
    const slide = galleryContainer.querySelector('.ticket-container');
    const prevBtn = sliderEl.querySelector('.prev');
    const nextBtn = sliderEl.querySelector('.next');
    const prevArrow = prevBtn.querySelector('.arrow');
    const nextArrow = nextBtn.querySelector('.arrow');
    const sliderDotsContainer = sliderEl.querySelector('.dots_container');
    // get constant parameters:
    const slideWidth = parseInt(slide.offsetWidth);
    const slideComputedMarginRight = getComputedStyle(slide).marginRight;
    const oneSlideScrollWidth = slideWidth + parseInt(slideComputedMarginRight);
    const oneSlideScrollThreshold = isMobile ? 0.25 : 0.35;
    const totalScrollsCount = slides.length - visibleSlidesCount;
    const slidesToScrollDefaultCount = 1;
    const sliderDotsCount = totalScrollsCount;
    const leftScrollLimit = 0;
    const rightScrollLimit = -(oneSlideScrollWidth * totalScrollsCount);
    const directions = {
      forward: 'forward',
      backward: 'backward',
    };
    // get variable parameters:
    let sliderDots = [];
    let currentScrollWidthX = 0;
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
    const getSlidesToScrollCurrentCount = (initialX, currentX) => {
      // get final count of slides to scroll and width:
      const actualScrollWidth = Math.abs(initialX - currentX);
      const slidesToScrollActualCount = actualScrollWidth / oneSlideScrollWidth;
      const actualScrollThreshold = Math.floor(slidesToScrollActualCount) + oneSlideScrollThreshold;
      const isThresholdPassed = actualScrollThreshold <= slidesToScrollActualCount;

      if (isThresholdPassed) {
        return Math.ceil(slidesToScrollActualCount);
      } else {
        return Math.floor(slidesToScrollActualCount);
      }
    };
    const toggleButtonDisabledClass = (button, arrow) => {
      button.classList.toggle('disabled');
      arrow.classList.toggle('disabled');
    };
    const disableButton = () => {
      // stop if buttons aren't displayed:
      const isPrevBtnDisplayed = prevBtn.style.display === 'none';
      const isNextBtnDisplayed = nextBtn.style.display === 'none';
      if (isPrevBtnDisplayed && isNextBtnDisplayed) return;

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
        onForward: () => Math.max((currentPosition - currentScrollWidthX), rightScrollLimit),
        onBackward: () => Math.min((currentPosition + currentScrollWidthX), leftScrollLimit)
      });
    };
    const setCurrentSlideIndex = () => {
      directionHandler({
        onForward: () => {
          // if (currentSlideIndex < totalScrollsCount) currentSlideIndex += slidesToScrollCurrentCount;
          currentSlideIndex = Math.min((currentSlideIndex + slidesToScrollCurrentCount), totalScrollsCount);
        },
        onBackward: () => {
          // if (currentSlideIndex > 0) currentSlideIndex -= slidesToScrollCurrentCount;
          currentSlideIndex = Math.max((currentSlideIndex - slidesToScrollCurrentCount), 0);

        }
      });
    };
    const changeActiveDot = () => {
      // remove class active from each dot:
      sliderDots.forEach(dot => dot.classList.remove('active'));
      // add class active to currentSlideIndex dot:
      sliderDots[currentSlideIndex].classList.add('active');
    };
    const scrollSlider = () => {
      const x = calculateNewPosition();
      galleryList.style.transform = `translateX(${x}px)`;
      // save x:
      currentPosition = x;
    };
    const onNavigationButtonClick = (direction) => {
      // prevent scroll if on limit:
      if (currentPosition === rightScrollLimit && direction === directions.forward) return;
      if (currentPosition === leftScrollLimit && direction === directions.backward) return;

      // set direction and scroll by direction:
      currentDirection = direction;
      currentScrollWidthX = oneSlideScrollWidth;
      slidesToScrollCurrentCount = slidesToScrollDefaultCount;
      scrollSlider();
      // set current index:
      setCurrentSlideIndex();
      // change active dot:
      changeActiveDot();
      // disable button if need:
      disableButton();
    };
    const onSliderDotCLick = (e) => {
      // get targeted dot element:
      const dot = e.target.closest('div.carousel_dot');
      // stop unless proper dot clicked:
      if (!dot) return;

      // reset currentSlideIndex to index of dot and change active:
      const index = Array.from(sliderDots).indexOf(dot);
      // set direction and scroll by direction:
      currentDirection = index > currentSlideIndex ? directions.forward : directions.backward;
      slidesToScrollCurrentCount = Math.abs(index - currentSlideIndex);
      currentScrollWidthX = oneSlideScrollWidth * slidesToScrollCurrentCount;
      scrollSlider();
      // set current index:
      setCurrentSlideIndex();
      // change active dot:
      changeActiveDot();
      // disable button if need:
      disableButton();
    };
    const onPointerDown = (e) => {
      let isScrollDirectionDefined = false;
      let isVerticalScroll = false;
      // prevent triggering events on other elements:
      e.currentTarget.setPointerCapture(e.pointerId);

      // remove transition:
      const transition = getComputedStyle(galleryList).transition;
      galleryList.style.transition = 'none';

      // get x coordinate:
      const initialTranslateX = currentPosition;
      const initialPointerX = e.pageX;
      const initialPointerY = e.pageY;
      let currentScrollWidthY = 0;
      let previousPointerX = initialPointerX;
      let currentPointerX = 0;
      let currentPointerY = 0;

      const startSlideMoving = (e) => {
        // prevent from highlighting text:
        e.preventDefault();

        // get scroll widths (X,Y):
        currentPointerX = e.pageX;
        currentPointerY = e.pageY;
        currentScrollWidthX = Math.abs(currentPointerX - previousPointerX);
        currentScrollWidthY = Math.abs(currentPointerY - initialPointerY);

        // get is scroll vertical or horizontal only on first move:
        if (!isScrollDirectionDefined) {
          isScrollDirectionDefined = true;
          isVerticalScroll = currentScrollWidthY > currentScrollWidthX;
          if (isVerticalScroll) {
            endSlideMoving();
            return;
          }
        }

        // get horizontal direction:
        currentDirection = currentPointerX > previousPointerX ? directions.backward : directions.forward;
        scrollSlider();

        // reset previous x:
        previousPointerX = currentPointerX;
      };
      const endSlideMoving = () => {
        removeListeners();
        if (!isVerticalScroll) isScrollDirectionDefined = false;

        // return transition value:
        galleryList.style.transition = transition;

        // return if didn't move or didn't change position:
        if (currentPointerX === initialPointerX || (!currentPointerX && currentPointerX !== 0)) return;

        slidesToScrollCurrentCount = getSlidesToScrollCurrentCount(initialPointerX, currentPointerX);
        currentScrollWidthX = slidesToScrollCurrentCount * oneSlideScrollWidth;

        // reset currentX to initial (state before scrolling by pointer):
        currentPosition = initialTranslateX;
        currentDirection = currentPointerX > initialPointerX ? directions.backward : directions.forward;

        scrollSlider();
        setCurrentSlideIndex();
        changeActiveDot();
        disableButton();
      };
      const preventContextMenuInterruption = (e) => {
        e.preventDefault();
        endSlideMoving();
      };
      // subscribe on events:
      const subscribeOnPointerMove = () => {
        document.addEventListener('pointermove', startSlideMoving);
      };
      const subscribeOnPointerUp = () => {
        document.addEventListener('pointerup', endSlideMoving);
      };
      const subscribeOnContextMenu = () => {
        document.addEventListener('contextmenu', preventContextMenuInterruption);
      };
      const removeListeners = () => {
        document.removeEventListener('pointermove', startSlideMoving);
        document.removeEventListener('pointerup', endSlideMoving);
        document.removeEventListener('contextmenu', preventContextMenuInterruption);
      };

      subscribeOnPointerMove();
      subscribeOnPointerUp();
      subscribeOnContextMenu();
    };

    const renderSliderDots = () => {
      // append dots into sliderDotsContainer:
      for (let i = 0; i <= sliderDotsCount; i++) {
        // create div element with class = 'carousel_dot':
        const dotElement = document.createElement('div');
        dotElement.className = 'carousel_dot';
        sliderDotsContainer.append(dotElement);
      }
    };
    const setInitialSliderState = () => {
      sliderDots = sliderDotsContainer.querySelectorAll('.carousel_dot');
      sliderDots[0].classList.add('active');
      const isPrevBtnDisabled = prevBtn.classList.contains('disabled');
      // if (currentMarginLeft === 0 && !isPrevBtnDisabled) {
      if (!isPrevBtnDisabled) {
        toggleButtonDisabledClass(prevBtn, prevArrow);
      }
      // currentPosition =
    };

    const subscribeOnButtonsClick = () => {
      prevBtn.addEventListener('click', () => onNavigationButtonClick(directions.backward));
      nextBtn.addEventListener('click', () => onNavigationButtonClick(directions.forward));
    };
    const subscribeOnSliderDotCLick = () => {
      sliderDotsContainer.addEventListener('click', onSliderDotCLick);
    };
    const subscribeOnPointerDown = () => {
      galleryContainer.addEventListener('pointerdown', onPointerDown);
      // prevent default browser behavior on dragstart:
      galleryContainer.ondragstart = () => false;
    };

    subscribeOnButtonsClick();
    subscribeOnSliderDotCLick();
    subscribeOnPointerDown();

    renderSliderDots();
    setInitialSliderState();
  };
// ---- slider functionality ends ----

  renderSlides();
  addSliderFunctionality();
};

activateSlider('#tickets-slider', slidesInfo, visibleSlidesCount);



