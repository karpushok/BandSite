// An array with all the shows' data
const showsData = [
  {
    date: 'Mon Sept 06 2021',
    venue: 'Ronald Rane',
    location: 'San Francisco, CA'
  },
  {
    date: 'Tue Sept 21 2021',
    venue: 'Pier 3 East',
    location: 'San Francisco, CA'
  },
  {
    date: 'Fri Oct 15 2021',
    venue: 'View Lounge',
    location: 'San Francisco, CA'
  },
  {
    date: 'Sat Nov 06 2021',
    venue: 'Hyatt Agency',
    location: 'San Francisco, CA'
  },
  {
    date: 'Fri Nov 26 2021',
    venue: 'Moscow Center',
    location: 'San Francisco, CA'
  },
  {
    date: 'Wed Dec 15 2021',
    venue: 'Press Club',
    location: 'San Francisco, CA'
  },
];

// Call the renderShows function with the showsData array as an argument
renderShows(showsData);

// Use JavaScript to dynamically create the HTML elements for each show and add them to the DOM
function renderShows(showsData) {
  // Create a div element to contain all the shows' data
  const showsList = document.createElement('div');
  showsList.classList.add('tickets__container');

  // Iterate over each show's data and create HTML elements for each
  showsData.forEach(show => {
    // Create a div element for each show
    const showElement = document.createElement('div');
    showElement.classList.add('tickets__row');
    
    // Create a p element for the date title
    const dataTitle = document.createElement('p');
    dataTitle.classList.add('tickets__header--date', 'tickets__header-cell', 'desktop-hidden');
    dataTitle.textContent = 'DATE';
    showElement.appendChild(dataTitle);

    // Create a p element for the date value
    const dateElement = document.createElement('p');
    dateElement.classList.add('tickets__date', 'tickets__cell--bolder', 'tickets__cell');
    dateElement.textContent = show.date;
    showElement.appendChild(dateElement);

    // Create a p element for the venue title
    const venueTitle = document.createElement('p');
    venueTitle.classList.add('tickets__header--venue', 'tickets__header-cell', 'desktop-hidden');
    venueTitle.textContent = 'VENUE';
    showElement.appendChild(venueTitle);

    // Create a p element for the venue value
    const venueElement = document.createElement('p');
    venueElement.classList.add('tickets__venue', 'tickets__cell');
    venueElement.textContent = show.venue;
    showElement.appendChild(venueElement);

    // Create a p element for the location title
    const locationTitle = document.createElement('p');
    locationTitle.classList.add('tickets__header--venue', 'tickets__header-cell', 'desktop-hidden');
    locationTitle.textContent = 'LOCATION';
    showElement.appendChild(locationTitle);

    // Create a p element for the location value
    const locationElement = document.createElement('p');
    locationElement.classList.add('tickets__location', 'tickets__cell');
    locationElement.textContent = show.location;
    showElement.appendChild(locationElement);

    // Create a button element for buying tickets
    const buyButton = document.createElement('button');
    buyButton.classList.add('tickets__buy-button');
    buyButton.textContent = 'Buy Tickets';
    showElement.appendChild(buyButton);

    // Create a divider line element
    const dividerLine = document.createElement('hr');
    dividerLine.classList.add('tickets__separator');
    showElement.appendChild(dividerLine);



    showsList.appendChild(showElement);
  });

  document.body.appendChild(showsList);
}