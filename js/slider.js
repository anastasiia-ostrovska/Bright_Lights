// ---- slider functionality starts ----
// ---- slider functionality ends ----

// ---- adding tickets on page starts ----
const addTicketsBlocks = (ticketsInfo, sliderId) => {
  // query elements:
  const sliderEl = document.querySelector(sliderId)
  const ticketsCount = ticketsInfo.length

  // add ticket layouts on the page:
  const addTicketsLayouts = () => {
    for (let i = 0; i < ticketsCount; i++) {
      const ticketContainer = document.createElement('div')
      ticketContainer.className = 'sec_6_ticket_container'
      ticketContainer.innerHTML = `
                <div class="sec_6_photo">
                  <img
                    class="img"
                    src=""
                    alt="concert photo"
                  />
                </div>

                <h5 class="sec_6_tittle">
                  <a href="" class="city"></a>
                  <br />
                  <a href="" class="concert-venue"></a>
                </h5>

                <div class="sec_6_ticket_bottom">
                  <time></time>

                  <a class="sec_6_button_link" href="">
                    <div class="sec_6_button">tickets</div>
                  </a>
                </div>`
      sliderEl.append(ticketContainer)
    }
  }
  // fill ticket layouts with information:
  const fillTicketsLayoutsWithInfo = () => {
  const ticketsContainers = sliderEl.querySelectorAll('.sec_6_ticket_container');
  ticketsContainers.forEach((ticket, index)=> {
    // query elements:
    const image = ticket.querySelector('.img');
    const locationCity = ticket.querySelector('.city');
    const locationConcertVenue = ticket.querySelector('.concert-venue');
    const date = ticket.querySelector('time');
    const ticketBtn = ticket.querySelector('.sec_6_button_link');
    const ticketInfo = ticketsInfo[index];
    const ticketInfoDate = ticketInfo.date;

    // add info:
    image.src = ticketInfo.img.src;
    locationCity.innerHTML = ticketInfo.location.city.name;
    locationCity.href = ticketInfo.location.city.mapHref;
    locationConcertVenue.innerHTML = ticketInfo.location.concertVenue.name;
    locationConcertVenue.href = ticketInfo.location.concertVenue.citeHref;
    date.innerHTML = `${ticketInfoDate.month} ${ticketInfoDate.day} ${ticketInfoDate.year}`;
    ticketBtn.href = ticketInfo.ticket.href;

  })
  }

  addTicketsLayouts();
  fillTicketsLayoutsWithInfo();
}
// ---- adding tickets on page ends ----

// ---- tickets info starts ----
const ticketsInfo = [
  {
    id: 1,
    location: {
      city: {
        name: 'Chandler, AZ',
        mapHref: 'https://maps.app.goo.gl/6KZL1sy2qDj96oMi6'
      },
      concertVenue: {
        name: 'The Park at Wild Horse Pass',
        citeHref: 'https://playatgila.com/entertainment/'
      },
    },
    date: {
      year: '2021',
      month: 'APR',
      day: '02'
    },
    img: {
      src: 'img/6_section_picture_1.png'
    },
    ticket: { href: '#' }
  },
  {
    id: 2,
    location: {
      city: {
        name: 'Ibiza, IBZ',
        mapHref: 'https://maps.app.goo.gl/spuQZuCgTyokweUd8'
      },
      concertVenue: {
        name: 'Swag Ibiza Club',
        citeHref: 'https://swagibizaoficial.com/',
      }
    },
    date: {
      year: '2021',
      month: 'JUL',
      day: '08'
    },
    img: {
      src: 'img/6_section_picture_2.png'
    },
    ticket: { href: '#' }

  },
  {
    id: 3,
    location: {
      city: {
        name: 'Ibiza, IBZ',
        mapHref: 'https://maps.app.goo.gl/QGYEFdgxuovkVcpc6'
      },
      concertVenue: {
        name: 'El Swing Ibiza',
        citeHref: 'https://swing-ibiza.negocio.site/',
      },
    },
    date: {
      year: '2021',
      month: 'APR',
      day: '02'
    },
    img: {
      src: 'img/6_section_picture_3.png'
    },
    ticket: { href: '#' }

  },
  {
    id: 4,
    location: {
      city: {
        name: 'Chandler, AZ',
        mapHref: 'https://maps.app.goo.gl/6KZL1sy2qDj96oMi6'
      },
      concertVenue: {
        name: 'The Park at Wild Horse Pass',
        citeHref: 'https://playatgila.com/entertainment/',
      },
    },
    date: {
      year: '2022',
      month: 'OCT',
      day: '12'
    },
    img: {
      src: 'img/6_section_picture_1.png'
    },
    ticket: { href: '#' }
  },
  {
    id: 5,
    location: {
      city: {
        name: 'Ibiza, IBZ',
        mapHref: 'https://maps.app.goo.gl/spuQZuCgTyokweUd8'
      },
      concertVenue: {
        name: 'Swag Ibiza Club',
        citeHref: 'https://swagibizaoficial.com/',
      }
    },
    date: {
      year: '2022',
      month: 'APR',
      day: '25'
    },
    img: {
      src: 'img/6_section_picture_2.png'
    },
    ticket: { href: '#' }
  },
  {
    id: 6,
    location: {
      city: {
        name: 'Ibiza, IBZ',
        mapHref: 'https://maps.app.goo.gl/QGYEFdgxuovkVcpc6'
      },
      concertVenue: {
        name: 'El Swing Ibiza',
        citeHref: 'https://swing-ibiza.negocio.site/',
      },
    },
    date: {
      year: '2022',
      month: 'MAY',
      day: '09'
    },
    img: {
      src: 'img/6_section_picture_3.png'
    },
    ticket: { href: '#' }
  }
]
// ---- tickets info ends ----

addTicketsBlocks(ticketsInfo, '#slider')