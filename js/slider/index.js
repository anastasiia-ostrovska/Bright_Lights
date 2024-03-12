import { galleryList } from '../tickets/index.js';
import { addSliderController } from './sliderController.js';

export const sliderEl = document.querySelector('#tickets-slider');

const slidesArray = sliderEl.querySelectorAll('.ticket-container');
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

