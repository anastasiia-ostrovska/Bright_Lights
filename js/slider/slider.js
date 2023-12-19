// import deviceTypeService from './deviceTypeService.mjs';

// console.log('deviceTypeService.getIsMobile(): ', deviceTypeService.getIsMobile());
// console.log('deviceTypeService.getIsDesktop(): ', deviceTypeService.getIsDesktop());
// console.log('deviceTypeService.getIsTablet(): ', deviceTypeService.getIsTablet());

// const isMobile = deviceTypeService.getIsMobile();
// const isTablet = deviceTypeService.getIsTablet();
// const isDesktop = deviceTypeService.getIsDesktop();

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

const activateSlider = (sliderId, slidesInfo) => {
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

  const getOneSlideScrollWidth = (slideElement) => {
    const slideWidth = Math.round(parseFloat(slideElement.offsetWidth));
    const slideComputedMarginRightPx = getComputedStyle(slideElement).marginRight;
    const slideMarginRight = Math.round(parseFloat(slideComputedMarginRightPx));

    return slideWidth + slideMarginRight;
  };

  const getTotalPossibleScrollsCount = (slidesArray) => {
    const deviceWidth = document.documentElement.clientWidth;
    const visibleSlidesCount = deviceWidth < 578 ? 1 : 3;
    const totalSlidesCount = slidesArray.length;

    return totalSlidesCount - visibleSlidesCount;
  };

  const getLimits = ({ limits, oneSlideScrollWidth, totalPossibleScrollsCount }) => {
    limits.possibleCurrentSlideIndex.max = totalPossibleScrollsCount;
    limits.possibleTranslateX.min = -(oneSlideScrollWidth * totalPossibleScrollsCount);

    return limits;
  };

// ---- slider functionality starts ----
  const addSliderFunctionality = () => {
    // GENERAL:
    // query elements and values:
    const slidesArray = galleryContainer.querySelectorAll('.ticket-container');
    const slideElement = slidesArray[0];
    const prevBtn = sliderEl.querySelector('.prev');
    const nextBtn = sliderEl.querySelector('.next');
    const prevArrow = prevBtn.querySelector('.arrow');
    const nextArrow = nextBtn.querySelector('.arrow');
    const sliderDotsContainer = sliderEl.querySelector('.dots_container');
    const transition = getComputedStyle(galleryList).transition; // save transition value
    // constant parameters:
    const scrolledSlidesDefaultCount = 1;
    const thresholdCoefficient = 0.35; // constant threshold
    const directions = {
      forward: 'forward',
      backward: 'backward',
      unchanged: 'unchanged',
    };

    // TODO:
    //  1. updateDirection;
    //  2. localStorage?
    //  3. navigationItems ={}

    // DUE TO WIDTH OF ELEMENTS AND ORIENTATION:
    // constant parameters:
    let oneSlideScrollWidth = 0;
    let totalPossibleScrollsCount = 0;
    let limits = {
      possibleCurrentSlideIndex: {
        max: totalPossibleScrollsCount,
        min: 0,
      },
      possibleTranslateX: {
        max: 0,
        min: -(oneSlideScrollWidth * totalPossibleScrollsCount),
      }
    };
    let sliderDots = [];
    // variable parameters:
    let currentSlideIndex = 0;
    let currentDirection = directions.unchanged;

    const updateDirection = ({ start, end, direction }) => {
      if (direction) {
        currentDirection = direction;
        return;
      }

      if (start > end) {
        currentDirection = directions.backward;
      } else if (start < end) {
        currentDirection = directions.forward;
      } else {
        currentDirection = directions.unchanged;
      }
    };

    const getIsDirectionUnchanged = (direction) => {
      return direction === directions.unchanged;
    };
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
    // ----
    const transitionHandler = (isRemove) => {
      if (isRemove) {
        galleryList.style.transition = 'none';
      } else {
        galleryList.style.transition = transition;

      }
    };
    // ----
    // index reset function:
    const setCurrentSlideIndex = (scrolledSlidesCount = scrolledSlidesDefaultCount) => {
      directionHandler({
        onForward: () => {
          currentSlideIndex = Math.min((currentSlideIndex + scrolledSlidesCount), limits.possibleCurrentSlideIndex.max);
        },
        onBackward: () => {
          currentSlideIndex = Math.max((currentSlideIndex - scrolledSlidesCount), limits.possibleCurrentSlideIndex.min);
        }
      });
    };
    // ----
    // translate X calculations:
    const getCurrentTranslateX = (galleryList) => {
      const transformValue = getComputedStyle(galleryList).transform;
      return transformValue === 'none' ? 0 : parseInt(transformValue.split(',')[4]);
    };
    const calculateNewTranslateX = (scrollWidthX) => {
      // get current translate X:
      const currentTranslateX = getCurrentTranslateX(galleryList);

      return directionHandler({
        onForward: () => Math.max((currentTranslateX - scrollWidthX), limits.possibleTranslateX.min),
        onBackward: () => Math.min((currentTranslateX + scrollWidthX), limits.possibleTranslateX.max)
      });
    };
    const setSliderTranslateX = (event, scrollWidthX) => {
      let x = 0;
      if (event?.type === 'pointermove') {
        x = calculateNewTranslateX(scrollWidthX);
      } else {
        x = -(currentSlideIndex * oneSlideScrollWidth);
      }
      galleryList.style.transform = `translateX(${x}px)`;
    };
    // ----
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

    const handleButtonDisabledOnLimits = (isPrevBtnDisabled, isNextBtnDisabled) => {
      if (currentSlideIndex === limits.possibleCurrentSlideIndex.max && !isNextBtnDisabled) {
        toggleButtonDisabledClass(nextBtn, nextArrow);
      }
      if (currentSlideIndex === limits.possibleCurrentSlideIndex.min && !isPrevBtnDisabled) {
        toggleButtonDisabledClass(prevBtn, prevArrow);
      }
    };
    const handleButtonDisabled = () => {
      // stop if buttons aren't displayed:
      const isPrevBtnDisplayed = getComputedStyle(prevBtn).display !== 'none';
      const isNextBtnDisplayed = getComputedStyle(nextBtn).display !== 'none';
      if (!isPrevBtnDisplayed || !isNextBtnDisplayed) return;

      const isPrevBtnDisabled = prevBtn.classList.contains('disabled');
      const isNextBtnDisabled = nextBtn.classList.contains('disabled');

      handleButtonDisabledOnLimits(isPrevBtnDisabled, isNextBtnDisabled);

      directionHandler({
        onForward: () => {
          if (isPrevBtnDisabled) {
            toggleButtonDisabledClass(prevBtn, prevArrow);
          }
        },
        onBackward: () => {
          if (isNextBtnDisabled) {
            toggleButtonDisabledClass(nextBtn, nextArrow);
          }
        }
      });
    };
    // ----
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
    const onPointerDown = (event) => {
      // prevent triggering events on other elements:
      event.currentTarget.setPointerCapture(event.pointerId);

      // get x/y coordinates:
      const startX = event.pageX;
      const startY = event.pageY;
      let endX = startX;
      // condition for scroll direction defining:
      let isScrollDirectionDefined = false;

      const startSlideMoving = (event) => {
        // prevent from highlighting text:
        event.preventDefault();
        // remove transition:
        transitionHandler(true);

        // get scroll widths (X,Y):
        const currentX = event.pageX;
        const currentY = event.pageY;
        const currentScrollWidthX = Math.abs(currentX - endX);
        const currentScrollWidthY = Math.abs(currentY - startY);

        // get is scroll vertical or horizontal only on first move:
        if (!isScrollDirectionDefined) {
          isScrollDirectionDefined = true;
          const isVerticalScroll = currentScrollWidthY > currentScrollWidthX;
          if (isVerticalScroll) {
            endSlideMoving(event);
            return;
          }
        }

        // get horizontal direction:
        updateDirection({ start: -endX, end: -currentX });
        setSliderTranslateX(event, currentScrollWidthX);

        // reset previous x:
        endX = currentX;
      };
      const endSlideMoving = (event) => {
        removeListeners();
        // return transition value:
        transitionHandler(false);

        // return if didn't move or didn't change position:
        if (endX === startX) return;

        updateDirection({ start: -startX, end: -endX });

        if (getIsDirectionUnchanged(currentDirection)) {
          setSliderTranslateX(event);
        } else {
          const scrolledSlidesCurrentCount = getScrolledSlidesCurrentCount(startX, endX);

          setCurrentSlideIndex(scrolledSlidesCurrentCount);
          setSliderTranslateX(event);
          updateDotActiveClass(currentSlideIndex);
          handleButtonDisabled();
        }
      };
      const preventContextMenuInterruption = (event) => {
        event.preventDefault();
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
    // ----
    const getIsOnEdge = () => {
      const isOnRightEdge = currentSlideIndex === limits.possibleCurrentSlideIndex.max;
      const isOnLeftEdge = currentSlideIndex === limits.possibleCurrentSlideIndex.min;

      return directionHandler({
        onForward: () => isOnRightEdge,
        onBackward: () => isOnLeftEdge
      });

    };
    const onNavigationButtonClick = (direction, event) => {
      updateDirection({ direction });

      // prevent scroll on edges:
      if (getIsOnEdge()) return;

      setCurrentSlideIndex();
      setSliderTranslateX(event);
      updateDotActiveClass(currentSlideIndex);
      handleButtonDisabled();
    };
    // ----
    const onSliderDotClick = (event) => {
      // get targeted dot element:
      const dot = event.target.closest('div.carousel_dot');
      // stop unless proper dot clicked:
      if (!dot) return;

      // get index of targeted dot:
      const index = Array.from(sliderDots).indexOf(dot);
      // set direction and scroll by direction:
      updateDirection({ start: currentSlideIndex, end: index });

      // set current index:
      currentSlideIndex = index;
      // scroll slides:
      setSliderTranslateX(event);
      // change active dot:
      updateDotActiveClass(currentSlideIndex);
      // disable button if need:
      handleButtonDisabled();
    };
    // ----
    const renderSliderDots = (totalPossibleScrollsCount) => {
      // if there are dots - remove them:
      sliderDots = sliderDotsContainer.querySelectorAll('.carousel_dot');
      // if (sliderDots) {
      for (let i = sliderDots.length - 1; i >= 0; i--) {
        sliderDots[i].remove();
      }
      sliderDots = [];
      // append dots into sliderDotsContainer:
      for (let i = 0; i <= totalPossibleScrollsCount; i++) {
        // create div element with class = 'carousel_dot':
        const dotElement = document.createElement('div');
        dotElement.className = 'carousel_dot';
        // add into DOM:
        sliderDotsContainer.append(dotElement);
        // add into sliderDots array:
        sliderDots.push(dotElement);
      }
    };

    const setParameters = (slideElement, slidesArray) => {
      // set parameters:
      oneSlideScrollWidth = getOneSlideScrollWidth(slideElement);
      totalPossibleScrollsCount = getTotalPossibleScrollsCount(slidesArray);
      limits = getLimits({ limits, oneSlideScrollWidth, totalPossibleScrollsCount });
    };

    const updateIndexOnResize = (currentIndex) => {
      currentSlideIndex = Math.min(currentIndex, limits.possibleCurrentSlideIndex.max);
    };

    const updateState = (event) => {
      transitionHandler(true);
      setParameters(slideElement, slidesArray);
      updateIndexOnResize(currentSlideIndex);
      setSliderTranslateX(event);
      renderSliderDots(totalPossibleScrollsCount);
      updateDotActiveClass(currentSlideIndex);
      handleButtonDisabled();
      transitionHandler(false);
    };

    const setInitialSliderState = () => {
      updateState();
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
    const subscribeOnWindowResize = () => {
      const delay = 250;
      let timerId = null;

      window.addEventListener('resize', () => {
        // clear timeout if there is:
        clearTimeout(timerId);
        timerId = setTimeout(updateState, delay);
      });
    };

    subscribeOnButtonsClick();
    subscribeOnSliderDotCLick();
    subscribeOnPointerDown();
    subscribeOnWindowResize();

    setInitialSliderState();
  };
// ---- slider functionality ends ----

  renderSlides();
  addSliderFunctionality();
};

activateSlider('#tickets-slider', slidesInfo);



