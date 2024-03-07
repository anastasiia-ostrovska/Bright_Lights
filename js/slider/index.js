import { ticketsInfo } from './ticketsInfo.js';
import { renderSlides } from './renderSlides.js';
import { addSliderController } from './sliderController.js';

const sliderEl = document.querySelector('#tickets-slider');
const galleryList = sliderEl.querySelector('.gallery-list');

renderSlides(ticketsInfo, galleryList);
export const slidesArray = sliderEl.querySelectorAll('.ticket-container');

const galleryContainer = sliderEl.querySelector('.gallery-container');
const sliderDotsContainer = sliderEl.querySelector('.dots_container');
const prevBtn = sliderEl.querySelector('.prev');
const nextBtn = sliderEl.querySelector('.next');
const scrolledSlidesDefaultCount = 1;
const thresholdCoefficient = 0.35; // constant threshold

addSliderController({
  galleryContainer,
  galleryList,
  slidesArray,
  sliderDotsContainer,
  prevBtn,
  nextBtn,
  scrolledSlidesDefaultCount,
  thresholdCoefficient,
});

