// An array with all the shows' data

const storedApiKey = sessionStorage.getItem('api_key')

let apiKey;
const url = 'https://project-1-api.herokuapp.com/';

function registerWithApi(url) {
  axios.get(url + 'register')
    .then(response => {
      // Save API key in global variable
      apiKey = response.data.api_key;
      // Save key to localstorage for later use
      sessionStorage.setItem('api_key', apiKey);
      
      // get shows, save them to a variable
      getShowDates( url );
      // Call the renderShows function with the showsData array as an argument
      ;
    })
    .catch(error => {
      console.error('Registration error:', error);
    });
}


if (storedApiKey) {
  apiKey = storedApiKey
  // get shows, save them to a variable
  getShowDates( url );
  // Call the renderShows function with the showsData array as an argument
  
} else {
  // Get API key from server
  registerWithApi(url);
}

function getShowDates(url) {
  
  const params = {
    api_key: apiKey
  };

  axios.get(url + 'showDates', { params: params }).then(response => {

    if (response.status === 200) {
      // Call the renderShows function with the showsData array as an argument
      renderShows(response.data);

    } else {
      renderShows([{
        date: 'no data',
        place: 'no data',
        location: 'no data'
      }])
    }

  })
}

// Use JavaScript to dynamically create the HTML elements for each show and add them to the DOM
function renderShows(showsData) {
  // Create a div element to contain all the shows' data
  showsList = document.querySelector('.tickets__container');

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
    
    // 
    dateElement.textContent = new Date(show.date).toLocaleDateString("en-GB", {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    showElement.appendChild(dateElement);

    // Create a p element for the venue title
    const venueTitle = document.createElement('p');
    venueTitle.classList.add('tickets__header--venue', 'tickets__header-cell', 'desktop-hidden');
    venueTitle.textContent = 'VENUE';
    showElement.appendChild(venueTitle);

    // Create a p element for the venue value
    const venueElement = document.createElement('p');
    venueElement.classList.add('tickets__venue', 'tickets__cell');
    venueElement.textContent = show.place;
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

    showsList.appendChild(showElement);
    showElement.addEventListener('click', (event) => { //add background-color to the current row
      document.querySelectorAll('.tickets__row').forEach(row => {
        row.style.backgroundColor = 'white';
      }) 
      event.currentTarget.style.backgroundColor = '#E1E1E1';
    })

    // Create a divider line element
    const dividerLine = document.createElement('hr');
    dividerLine.classList.add('tickets__separator');
    showsList.appendChild(dividerLine);
  });

  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
  
  const main = document.querySelector('.main');

  insertAfter(main, showsList)
}