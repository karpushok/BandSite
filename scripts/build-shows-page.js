// Define base API URL
const url = 'https://project-1-api.herokuapp.com/'

// Function for registering and getting the API key
function registerWithApi(url) {
  // Send a GET request to the registration endpoint
  return axios
    .get(url + 'register')
    .then((response) => {
      // Store the received API key in session storage
      sessionStorage.setItem('api_key', response.data.api_key)
      // Return the API key
      return response.data.api_key
    })
    .catch((error) => {
      console.error('Registration error:', error)
    })
}

// Function for getting show dates data
function getShowDates(url, apiKey) {
  const params = { api_key: apiKey }

  // Send a GET request to the endpoint that returns show dates
  return axios.get(url + 'showDates', { params: params })
    .then(response => response.data)
    .catch((error) => {
      console.error('Error getting show dates:', error)
      // Return a default object in case of an error
      return [{
        date: 'no data',
        place: 'no data',
        location: 'no data',
      }]
    })
}

// Helper function for creating HTML elements
function createElement(type, classes, textContent) {
  const element = document.createElement(type)
  element.classList.add(...classes)
  element.textContent = textContent
  return element
}

// Function for rendering shows
function renderShows(showsData) {
  // Select the container for the shows
  const showsList = document.querySelector('.tickets__container')

  // Iterate over each show's data
  showsData.forEach((show) => {
    // Create and append various elements using the helper function
    const showElement = createElement('div', ['tickets__row'])
    const dataTitle = createElement('p', ['tickets__header--date', 'tickets__header-cell', 'desktop-hidden'], 'DATE')
    const dateElement = createElement('p', ['tickets__date', 'tickets__cell--bolder', 'tickets__cell'], formatShowDate(show.date))
    const venueTitle = createElement('p', ['tickets__header--venue', 'tickets__header-cell', 'desktop-hidden'], 'VENUE')
    const venueElement = createElement('p', ['tickets__venue', 'tickets__cell'], show.place)
    const locationTitle = createElement('p', ['tickets__header--venue', 'tickets__header-cell', 'desktop-hidden'], 'LOCATION')
    const locationElement = createElement('p', ['tickets__location', 'tickets__cell'], show.location)
    const buyButton = createElement('button', ['tickets__buy-button'], 'Buy Tickets')

    // Append all elements to the show element
    showElement.append(dataTitle, dateElement, venueTitle, venueElement, locationTitle, locationElement, buyButton)

    // Append the show element to the shows list
    showsList.appendChild(showElement)
    showElement.addEventListener('click', (event) => {
      // On click, change the background color of the current row
      document.querySelectorAll('.tickets__row').forEach((row) => {
        row.style.backgroundColor = 'white'
      })
      event.currentTarget.style.backgroundColor = '#E1E1E1'
    })

    // Add a divider line
    const dividerLine = createElement('hr', ['tickets__separator'])
    showsList.appendChild(dividerLine)
  })

  // Add the shows list after the main element
  insertAfter(document.querySelector('.main'), showsList)
}

// Function for formatting the show date
function formatShowDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Function to insert a new node after a reference node
function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

// Get the stored API key from the session storage
let apiKey = sessionStorage.getItem('api_key')

// If the API key is not available, register with the API to get a new key
if (!apiKey) {
  registerWithApi(url)
    .then(apiKeyFromServer => {
      apiKey = apiKeyFromServer
      // Then get the show dates with the new key
      return getShowDates(url, apiKey)
    })
    .then(showsData => {
      // Render the shows with the obtained data
      renderShows(showsData)
    })
    .catch(console.error)
} else {
  // If the API key is available, directly get the show dates
  getShowDates(url, apiKey)
    .then(showsData => {
      // Render the shows with the obtained data
      renderShows(showsData)
    })
    .catch(console.error)
}

