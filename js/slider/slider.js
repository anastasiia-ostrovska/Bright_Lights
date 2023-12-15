// import deviceTypeService from './deviceTypeService.mjs';

// console.log('deviceTypeService.getIsMobile(): ', deviceTypeService.getIsMobile());
// console.log('deviceTypeService.getIsDesktop(): ', deviceTypeService.getIsDesktop());
// console.log('deviceTypeService.getIsTablet(): ', deviceTypeService.getIsTablet());

// const isMobile = deviceTypeService.getIsMobile();
// const isTablet = deviceTypeService.getIsTablet();
// const isDesktop = deviceTypeService.getIsDesktop();

// TODO: change e to event;

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
    const slide = slides[0];
    const prevBtn = sliderEl.querySelector('.prev');
    const nextBtn = sliderEl.querySelector('.next');
    const prevArrow = prevBtn.querySelector('.arrow');
    const nextArrow = nextBtn.querySelector('.arrow');
    const sliderDotsContainer = sliderEl.querySelector('.dots_container');
    // save transition value:
    const transition = getComputedStyle(galleryList).transition;
    // get constant parameters:
    const slideWidth = parseInt(slide.offsetWidth);
    const slideComputedMarginRight = getComputedStyle(slide).marginRight;
    const oneSlideScrollWidth = slideWidth + parseInt(slideComputedMarginRight);
    // TODO: isMobile (below) isn't accurately describe the condition;
    const thresholdCoefficient = isMobile ? 0.25 : 0.35;
    const totalPossibleScrollsCount = slides.length - visibleSlidesCount;
    const slidesPerScrollDefaultCount = 1;
    // get limits:
    const minPossibleCurrentSlideIndex = 0;
    const maxPossibleCurrentSlideIndex = totalPossibleScrollsCount;
    const maxTranslateX = 0;
    const minTranslateX = -(oneSlideScrollWidth * totalPossibleScrollsCount);
    // TODO: group variables in objects;
    const directions = {
      forward: 'forward',
      backward: 'backward',
    };
    // get variable parameters:
    let sliderDots = [];
    let currentSlideIndex = 0;
    let currentDirection = '';

    // direction handler function:
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
    // index reset function:
    const setCurrentSlideIndex = (scrolledSlidesCount = slidesPerScrollDefaultCount) => {
      directionHandler({
        onForward: () => {
          currentSlideIndex = Math.min((currentSlideIndex + scrolledSlidesCount), maxPossibleCurrentSlideIndex);
        },
        onBackward: () => {
          currentSlideIndex = Math.max((currentSlideIndex - scrolledSlidesCount), minPossibleCurrentSlideIndex);
        }
      });
    };
    // translate X calculations:
    const getCurrentTranslateX = (galleryList) => {
      const slideTransformValue = getComputedStyle(galleryList).transform;

      if (slideTransformValue !== 'none') {
        const slideMatrixValues = slideTransformValue.match(/(-?[0-9.]+)/g);
        return parseInt(slideMatrixValues[4]);
      } else {
        return 0;
      }
    };
    const calculateNewTranslateX = (scrollWidthX) => {
      // get current translate X:
      const currentTranslateX = getCurrentTranslateX(galleryList);

      return directionHandler({
        onForward: () => Math.max((currentTranslateX - scrollWidthX), minTranslateX),
        onBackward: () => Math.min((currentTranslateX + scrollWidthX), maxTranslateX)
      });
    };
    const scrollSlider = (e, scrollWidthX) => {
      let x = 0;
      if (e.type === 'pointermove') {
        x = calculateNewTranslateX(scrollWidthX);
      } else {
        x = -(currentSlideIndex * oneSlideScrollWidth);
      }
      galleryList.style.transform = `translateX(${x}px)`;
    };
    // handle navigation indicators changes:
    const updateDotActiveClass = (index) => {
      // remove class active from each dot:
      sliderDots.forEach(dot => dot.classList.remove('active'));
      // add class active to currentSlideIndex dot:
      sliderDots[index].classList.add('active');
    };
    const toggleButtonDisabledClass = (button, arrow) => {
      button.classList.toggle('disabled');
      arrow.classList.toggle('disabled');
    };
    const handleButtonDisabled = () => {
      // stop if buttons aren't displayed:
      const isPrevBtnDisplayed = prevBtn.style.display !== 'none';
      const isNextBtnDisplayed = nextBtn.style.display !== 'none';
      if (!isPrevBtnDisplayed || !isNextBtnDisplayed) return;

      const isPrevBtnDisabled = prevBtn.classList.contains('disabled');
      const isNextBtnDisabled = nextBtn.classList.contains('disabled');
      directionHandler({
        onForward: () => {
          if (isPrevBtnDisabled) {
            toggleButtonDisabledClass(prevBtn, prevArrow);
          }
          if (currentSlideIndex === maxPossibleCurrentSlideIndex && !isNextBtnDisabled) {
            toggleButtonDisabledClass(nextBtn, nextArrow);
          }
        },
        onBackward: () => {
          if (isNextBtnDisabled) {
            toggleButtonDisabledClass(nextBtn, nextArrow);
          }
          if (currentSlideIndex === minPossibleCurrentSlideIndex && !isPrevBtnDisabled) {
            toggleButtonDisabledClass(prevBtn, prevArrow);
          }
        }
      });
    };
    // navigation manipulation functions:
    const getScrolledSlidesCurrentCount = (initialX, currentX) => {
      // get final count of slides to scroll:
      const totalCurrentScrollWidth = Math.abs(initialX - currentX);
      const scrolledSlidesActualCount = totalCurrentScrollWidth / oneSlideScrollWidth; // possibly not integer
      const currentScrollThreshold = Math.floor(scrolledSlidesActualCount) + thresholdCoefficient;
      const isThresholdPassed = currentScrollThreshold <= scrolledSlidesActualCount;

      if (isThresholdPassed) {
        return Math.ceil(scrolledSlidesActualCount);
      } else {
        return Math.floor(scrolledSlidesActualCount);
      }
    };
    const onPointerDown = (e) => {
      // prevent triggering events on other elements:
      e.currentTarget.setPointerCapture(e.pointerId);

      // get x/y coordinates:
      const initialPointerX = e.pageX;
      const initialPointerY = e.pageY;
      let lastPointerX = initialPointerX;
      // condition for scroll direction defining:
      let isScrollDirectionDefined = false;

      const startSlideMoving = (e) => {
        // prevent from highlighting text:
        e.preventDefault();
        // remove transition:
        galleryList.style.transition = 'none';

        // get scroll widths (X,Y):
        const currentPointerX = e.pageX;
        const currentPointerY = e.pageY;
        const currentScrollWidthX = Math.abs(currentPointerX - lastPointerX);
        const currentScrollWidthY = Math.abs(currentPointerY - initialPointerY);

        // get is scroll vertical or horizontal only on first move:
        if (!isScrollDirectionDefined) {
          isScrollDirectionDefined = true;
          const isVerticalScroll = currentScrollWidthY > currentScrollWidthX;
          if (isVerticalScroll) {
            endSlideMoving(e);
            return;
          }
        }

        // get horizontal direction:
        currentDirection = currentPointerX > lastPointerX ? directions.backward : directions.forward;
        scrollSlider(e, currentScrollWidthX);

        // reset previous x:
        lastPointerX = currentPointerX;
      };
      const endSlideMoving = (e) => {
        removeListeners();
        // return transition value:
        galleryList.style.transition = transition;

        // return if didn't move or didn't change position:
        if (lastPointerX === initialPointerX) return;

        currentDirection = lastPointerX > initialPointerX ? directions.backward : directions.forward;
        const scrolledSlidesCurrentCount = getScrolledSlidesCurrentCount(initialPointerX, lastPointerX);

        setCurrentSlideIndex(scrolledSlidesCurrentCount);
        scrollSlider(e);
        updateDotActiveClass(currentSlideIndex);
        handleButtonDisabled();
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
    const onNavigationButtonClick = (direction, e) => {
      // prevent scroll on edges:
      const isOnRightEdge = currentSlideIndex === maxPossibleCurrentSlideIndex;
      const isOnLeftEdge = currentSlideIndex === minPossibleCurrentSlideIndex;
      const isForward = direction === directions.forward;
      const isBackward = direction === directions.backward;
      if (isOnRightEdge && isForward) return;
      if (isOnLeftEdge && isBackward) return;

      // set direction and scroll by direction:
      currentDirection = direction;

      setCurrentSlideIndex();
      scrollSlider(e);
      updateDotActiveClass(currentSlideIndex);
      handleButtonDisabled();
    };
    const onSliderDotClick = (e) => {
      // get targeted dot element:
      const dot = e.target.closest('div.carousel_dot');
      // stop unless proper dot clicked:
      if (!dot) return;

      // get index of targeted dot:
      const index = Array.from(sliderDots).indexOf(dot);
      // set direction and scroll by direction:
      currentDirection = index > currentSlideIndex ? directions.forward : directions.backward;
      // set current index:
      currentSlideIndex = index;
      // scroll slides:
      scrollSlider(e);
      // change active dot:
      updateDotActiveClass(currentSlideIndex);
      // disable button if need:
      handleButtonDisabled();
    };

    const renderSliderDots = () => {
      // append dots into sliderDotsContainer:
      for (let i = 0; i <= totalPossibleScrollsCount; i++) {
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
      prevBtn.addEventListener('click', (e) => onNavigationButtonClick(directions.backward, e));
      nextBtn.addEventListener('click', (e) => onNavigationButtonClick(directions.forward, e));
    };
    const subscribeOnSliderDotCLick = () => {
      sliderDotsContainer.addEventListener('click', onSliderDotClick);
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



