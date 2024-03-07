import { ticketsInfo } from './ticketsInfo.js';
import { renderTickets } from './renderTickets.js';

export const galleryList = document.querySelector('#tickets-slider .gallery-list');

renderTickets(ticketsInfo, galleryList);





