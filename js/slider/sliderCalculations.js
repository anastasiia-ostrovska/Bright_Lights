export const getOneSlideScrollWidth = (slideElement) => {
  const slideWidth = Math.round(parseFloat(slideElement.offsetWidth));
  const slideComputedMarginRightPx = getComputedStyle(slideElement).marginRight;
  const slideMarginRight = Math.round(parseFloat(slideComputedMarginRightPx));

  return slideWidth + slideMarginRight;
};

export const getTotalPossibleScrollsCount = (slidesArray) => {
  const deviceWidth = document.documentElement.clientWidth;
  const visibleSlidesCount = deviceWidth < 578 ? 1 : 3;
  const totalSlidesCount = slidesArray.length;

  return totalSlidesCount - visibleSlidesCount;
};

export const getLimits = ({ limits, oneSlideScrollWidth, totalPossibleScrollsCount }) => {
  limits.possibleCurrentSlideIndex.max = totalPossibleScrollsCount;
  limits.possibleTranslateX.min = -(oneSlideScrollWidth * totalPossibleScrollsCount);

  return limits;
};

export const getCurrentTranslateX = (galleryList) => {
  const transformValue = getComputedStyle(galleryList).transform;
  return transformValue === 'none' ? 0 : parseInt(transformValue.split(',')[4]);
};

export const getScrolledSlidesCurrentCount = ({ initialX, currentX, oneSlideScrollWidth, thresholdCoefficient }) => {
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