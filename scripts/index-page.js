// Global variable to store API key
const storedApiKey = sessionStorage.getItem('api_key')

let apiKey
const url = 'https://project-1-api.herokuapp.com/'

// Function to register and get the API key from the server
function registerWithApi(url) {
  axios // Making a GET request to the registration endpoint
    .get(url + 'register')
    .then((response) => {
      // The API key is stored in the global variable after successful registration
      apiKey = response.data.api_key
      // The key is also saved to sessionStorage for future use
      sessionStorage.setItem('api_key', apiKey)

      // Fetch comments from the API after successful registration
      getCommentsAndAppendToDom(url)
    })
    .catch((error) => { // If the registration fails, log the error
      console.error('Registration error:', error)
    })
}

// Check if API key is stored, if not, register with the API
if (storedApiKey) {
  // If the API key is already stored, use that key
  apiKey = storedApiKey // Fetch comments from the API
  getCommentsAndAppendToDom(url)
} else {
  registerWithApi(url) // If the API key is not stored, register with the API to get a new key
}

// Function to fetch comments from the API and display them on the webpage
function getCommentsAndAppendToDom(url) {
  // Create query parameters object with the API key
  const params = {
    api_key: apiKey,
  }
  // Make a GET request to the comments endpoint of the API
  axios
    .get(url + 'comments', { params: params })
    .then((response) => {
      const comments = response.data
      // Extract the comments from the response data
      comments // Sort the comments by timestamp (newest first) and add them to the webpage
        .sort((a, b) => a.timestamp - b.timestamp) 
        .forEach((comment) => { // For each comment, create the DOM structure and append it to the page
          createAndAppendComment(comment);
        })
    })
    .catch((error) => { // If fetching the comments fails, log the error
      console.error('Error retrieving comments:', error)
    })
}

const submitComment = document.getElementById('submit-comment') // Get the submit button DOM element
submitComment.addEventListener('click', sendComment) // Attach an event listener to the submit button to handle comment submission

function sendComment() { // Function to send a comment to the API
  const nameValue = document.querySelector('#name').value
  const commentValue = document.querySelector('#comment').value
  const newComment = {
    name: nameValue,
    comment: commentValue,
  }

  if (commentValue == '') { //highlight the form in red if one of the fields is empty
    document.querySelector('#comment').style.borderColor = '#D22D2D'
    return
  } else {
    document.querySelector('#comment').style.borderColor = '#E1E1E1'
  }

  if (nameValue == '') {
    document.querySelector('#name').style.borderColor = '#D22D2D'
    return
  } else {
    document.querySelector('#name').style.borderColor = '#E1E1E1'
  }

  axios
    .post(url + `comments?api_key=${apiKey}`, newComment) // save comment to API
    .then((response) => {  // clearing the form after submitting a comment
      createAndAppendComment(response.data);
      document.querySelector('#name').value = ''
      document.querySelector('#comment').value = ''
    })
}

function createAndAppendComment(commentData) {  // Function to create a comment structure and append it to the webpage
  const commentList = document.createElement('div')
  const avatar = document.createElement('div')
  const avatarContainer = document.createElement('div')
  const innerAvatarEmptyDiv = document.createElement('div')
  const commentListParagraph = document.createElement('p')
  const commentListParagraphName = document.createElement('p')
  const commentListParagraphDate = document.createElement('p')
  const ticketsSeparator = document.createElement('hr')
  const commentsButtons = document.createElement('div')
  const commentButtonLike = document.createElement('button')
  const commentButtonDelete = document.createElement('button')
  const commentButtonLikeCount = document.createElement('p')

  ticketsSeparator.classList.add('tickets__separator') // add classes for elements
  commentList.classList.add('comment-list')
  avatar.classList.add('avatar')
  avatarContainer.classList.add('avatar__container')
  commentListParagraph.classList.add('comment-list__paragraph')
  commentListParagraphName.classList.add(
    'comment-list__paragraph',
    'is--bolded'
  )
  commentListParagraphDate.classList.add(
    'comment-list__paragraph',
    'is--grey'
  )
  commentButtonLikeCount.classList.add('comment-list__paragraph')
  commentButtonLike.classList.add('comment-list__button')
  commentButtonDelete.classList.add('comment-list__button')

  commentList.setAttribute('id', `comment-${commentData.id}`) // set id to comments
  commentButtonLike.setAttribute('data-id', `${commentData.id}`)
  commentButtonLikeCount.setAttribute('id', `count-${commentData.id}`)

  commentButtonLike.addEventListener(
    'click',
    handleLike.bind(null, commentData.id)
  )
  commentButtonDelete.addEventListener(
    'click',
    handleDelete.bind(null, commentData.id)
  )

  commentListParagraph.innerText = commentData.comment
  commentListParagraphName.innerText = commentData.name
  commentListParagraphDate.innerText = new Date( // set a data to comments
    commentData.timestamp
  ).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  commentButtonLikeCount.innerHTML = commentData.likes // add icons for likes and delete
  commentButtonLike.innerHTML = `
<img src="./assets/icons/like.png" alt="Like" class="comments__buttons--button">
`
  commentButtonDelete.innerHTML = `
<img src="./assets/icons/delete.png" alt="Delete" class="comments__buttons--button">
`
  commentsButtons.append( // publish comments from the API to the page
    commentButtonLike,
    commentButtonLikeCount,
    commentButtonDelete
  )

  innerAvatarEmptyDiv.append(
    commentListParagraphName,
    commentListParagraphDate
  )
  avatarContainer.appendChild(innerAvatarEmptyDiv)
  avatarContainer.appendChild(commentListParagraph)
  avatarContainer.appendChild(commentsButtons)

  commentList.appendChild(avatar)
  commentList.appendChild(avatarContainer)

  document.querySelector('.comments-default').prepend(ticketsSeparator)
  document.querySelector('.comments-default').prepend(commentList)
}

function handleLike(id, event) {
  // Function to handle liking a comment
  event.stopPropagation() // stop event from triggering other on click events

  const likeCountById = document.getElementById(`count-${id}`)

  axios
    .put(url + `comments/${id}/like?api_key=${apiKey}`)
    .then((response) => {
      if (response.status === 200) {
        likeCountById.innerText = response.data.likes
      }
    })
    .catch((error) => {
      console.error(`Like error`, error)
    })
}

function handleDelete(id, event) {
  // Function to handle deleting a comment
  event.stopPropagation() // stop event from triggering other on click events

  const commentElement = document.getElementById(`comment-${id}`)
  const commentSeparator = commentElement.nextElementSibling

  const result = confirm('You sure you want to delete this comment?') // comment deletion confirmation

  if (result) { // if the confirm button is pressed, then delete the comment and the separator
    axios
      .delete(url + `comments/${id}/?api_key=${apiKey}`)
      .then((response) => {
        if (response.status === 200) {
          commentElement.remove() 
          commentSeparator.remove()
        }
      })
      .catch((error) => {
        console.error(`Delete error`, error) // console a message if status not equal to 200
      })
  }
}