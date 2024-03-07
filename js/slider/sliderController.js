import { getOneSlideScrollWidth } from './sliderCalculations.js';
import { getTotalPossibleScrollsCount } from './sliderCalculations.js';
import { getLimits } from './sliderCalculations.js';
import { getCurrentTranslateX } from './sliderCalculations.js';

export const addSliderController = ({
  galleryContainer,
  galleryList,
  slidesArray,
  sliderDotsContainer,
  prevBtn,
  nextBtn,
  scrolledSlidesDefaultCount,
  thresholdCoefficient,
}) => {
  // GENERAL:
  // query elements and values:
  const slideElement = slidesArray[0];
  const transition = getComputedStyle(galleryList).transition; // save transition value
  const navigationItems = {
    buttons: {
      prev: prevBtn,
      next: nextBtn,
    },
    dots: [],
  };
  // constant parameters:
  const directions = {
    forward: 'forward',
    backward: 'backward',
    unchanged: 'unchanged',
  };

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

  const getIsPositionUnchanged = (direction, scrolledSlidesCount) => {
    const isDirectionUnchanged = direction === directions.unchanged;
    const isSlideScrolled = scrolledSlidesCount !== 0;

    return isDirectionUnchanged || !isSlideScrolled;
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
  const transitionHandler = (removeTransition) => {
    if (removeTransition) {
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
  // translate X calculations:
  // ----
  const calculateNewTranslateX = (scrollWidthX) => {
    // get current translate X:
    const currentTranslateX = getCurrentTranslateX(galleryList);

    return directionHandler({
      onForward: () => {
        return Math.max((currentTranslateX - scrollWidthX), limits.possibleTranslateX.min);
      },
      onBackward: () => {
        return Math.min((currentTranslateX + scrollWidthX), limits.possibleTranslateX.max);
      }
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
    navigationItems.dots.forEach(dot => dot.classList.remove('active'));
    // add class active to currentSlideIndex dot:
    navigationItems.dots[index].classList.add('active');
  };

  const toggleButtonDisabledClass = (button) => {
    button.classList.toggle('disabled');
  };

  const handleButtonDisabledOnLimits = (isPrevBtnDisabled, isNextBtnDisabled) => {
    if (currentSlideIndex === limits.possibleCurrentSlideIndex.max && !isNextBtnDisabled) {
      toggleButtonDisabledClass(navigationItems.buttons.next);
    }
    if (currentSlideIndex === limits.possibleCurrentSlideIndex.min && !isPrevBtnDisabled) {
      toggleButtonDisabledClass(navigationItems.buttons.prev);
    }
  };
  const handleButtonDisabled = () => {
    // stop if buttons aren't displayed:
    const isPrevBtnDisplayed = getComputedStyle(navigationItems.buttons.prev).display !== 'none';
    const isNextBtnDisplayed = getComputedStyle(navigationItems.buttons.next).display !== 'none';
    if (!isPrevBtnDisplayed || !isNextBtnDisplayed) return;

    const isPrevBtnDisabled = navigationItems.buttons.prev.classList.contains('disabled');
    const isNextBtnDisabled = navigationItems.buttons.next.classList.contains('disabled');

    handleButtonDisabledOnLimits(isPrevBtnDisabled, isNextBtnDisabled);

    directionHandler({
      onForward: () => {
        if (isPrevBtnDisabled) {
          toggleButtonDisabledClass(navigationItems.buttons.prev);
        }
      },
      onBackward: () => {
        if (isNextBtnDisabled) {
          toggleButtonDisabledClass(navigationItems.buttons.next);
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
    // get x/y coordinates:
    const startX = event.pageX;
    const startY = event.pageY;
    let endX = startX;
    // condition for handling the first move:
    let isFirstMoveHandled = false;

    const startSlideMoving = (event) => {
      // prevent from highlighting text:
      event.preventDefault();

      // get scroll widths (X,Y):
      const currentX = event.pageX;
      const currentY = event.pageY;
      const currentScrollWidthX = Math.abs(currentX - endX);
      const currentScrollWidthY = Math.abs(currentY - startY);

      // handle first move:
      if (!isFirstMoveHandled) {
        isFirstMoveHandled = true;
        const isVerticalScroll = currentScrollWidthY > currentScrollWidthX;

        if (isVerticalScroll) {
          removeListeners();
          return;
        } else {
          // remove transition:
          transitionHandler(true);
          document.addEventListener('pointerup', endSlideMoving);
        }
      }

      // get horizontal direction:
      updateDirection({ start: -endX, end: -currentX });
      setSliderTranslateX(event, currentScrollWidthX);

      // reset previous x:
      endX = currentX;
    };
    const endSlideMoving = (event) => {
      // return transition value:
      transitionHandler(false);
      updateDirection({ start: -startX, end: -endX });

      const scrolledSlidesCurrentCount = getScrolledSlidesCurrentCount(startX, endX);

      if (getIsPositionUnchanged(currentDirection, scrolledSlidesCurrentCount)) {
        setSliderTranslateX(event);
      } else {
        setCurrentSlideIndex(scrolledSlidesCurrentCount);
        setSliderTranslateX(event);
        updateDotActiveClass(currentSlideIndex);
        handleButtonDisabled();
      }

      document.removeEventListener('pointerup', endSlideMoving);
    };
    const removeListeners = () => {
      document.removeEventListener('pointermove', startSlideMoving);
      document.removeEventListener('contextmenu', preventContextMenuInterruption);
      document.removeEventListener('pointerup', removeListeners);
    };
    const preventContextMenuInterruption = (event) => {
      event.preventDefault();
      endSlideMoving();
    };

    // subscribe on events:
    const subscribeOnPointerMove = () => {
      document.addEventListener('pointermove', startSlideMoving);
    };
    const subscribeOnContextMenu = () => {
      document.addEventListener('contextmenu', preventContextMenuInterruption);
    };
    const subscribeOnPointerUp = () => {
      document.addEventListener('pointerup', removeListeners);
    };

    subscribeOnPointerMove();
    subscribeOnContextMenu();
    subscribeOnPointerUp();
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
    const index = [...navigationItems.dots].indexOf(dot);
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
    for (let i = navigationItems.dots.length - 1; i >= 0; i--) {
      navigationItems.dots[i].remove();
      navigationItems.dots.pop();
    }
    // append dots into sliderDotsContainer:
    for (let i = 0; i <= totalPossibleScrollsCount; i++) {
      // create div element with class = 'carousel_dot':
      const dotElement = document.createElement('div');
      dotElement.className = 'carousel_dot';
      // add into DOM:
      sliderDotsContainer.append(dotElement);
      // add into sliderDots array:
      navigationItems.dots.push(dotElement);
    }
  };

  const setParameters = (slideElement, slidesArray) => {
    // set parameters:
    oneSlideScrollWidth = getOneSlideScrollWidth(slideElement);
    totalPossibleScrollsCount = getTotalPossibleScrollsCount(slidesArray);
    limits = getLimits({
      limits,
      oneSlideScrollWidth,
      totalPossibleScrollsCount
    });
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
    navigationItems.buttons.prev.addEventListener('click', (e) => {
      onNavigationButtonClick(directions.backward, e);
    });
    navigationItems.buttons.next.addEventListener('click', (e) => {
      onNavigationButtonClick(directions.forward, e);
    });
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