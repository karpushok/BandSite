// Global variable to store API key

const storedApiKey = sessionStorage.getItem('api_key')

let apiKey;
const url = 'https://project-1-api.herokuapp.com/';

// Function to retrieve API key from server
function registerWithApi(url) {
  axios.get(url + 'register')
    .then(response => {
      // Save API key in global variable
      apiKey = response.data.api_key;
      // Save key to localstorage for later use
      sessionStorage.setItem('api_key', apiKey);

      // Save API key in global variable
      getCommentsAndAppendToDom(url);
    })
    .catch(error => {
      console.error('Registration error:', error);
    });
}

// Get API key from server
  
if (storedApiKey) {
  apiKey = storedApiKey
  getCommentsAndAppendToDom(url);

} else {
  registerWithApi(url);
}

// Function to retrieve comments from API and add them to the page
function getCommentsAndAppendToDom(url) {
  // Add API key to query params
  const params = {
    api_key: apiKey
  };

  axios.get(url + 'comments', { params: params }).then(response => {
      // Get comments from API response
      const comments = response.data;

      // Add comments to the page
      comments.sort((a , b) => b.timestamp - a.timestamp).forEach(comment => {
        const commentList = document.createElement('div');
        const avatar = document.createElement('div');
        const avatarContainer = document.createElement('div');
        const innerAvatarEmptyDiv = document.createElement('div')
        const commentListParagraph = document.createElement('p')
        const commentListParagraphName = document.createElement('p')
        const commentListParagraphDate = document.createElement('p')
        const ticketsSeparator = document.createElement('hr');

        const commentsButtons = document.createElement('div');
        const commentButtonLike = document.createElement('button');
        const commentButtonLikeCount = document.createElement('p');
        const commentButtonDelete = document.createElement('button');

        ticketsSeparator.classList.add('tickets__separator');
        commentList.classList.add('comment-list');
        avatar.classList.add('avatar');
        avatarContainer.classList.add('avatar__container');
        commentListParagraph.classList.add('comment-list__paragraph');
        commentListParagraphName.classList.add('comment-list__paragraph', 'is--bolded')
        commentListParagraphDate.classList.add('comment-list__paragraph', 'is--grey')
        commentButtonLikeCount.classList.add('comment-list__paragraph')
        commentButtonLike.classList.add('comment-list__button')
        commentButtonDelete.classList.add('comment-list__button')
        
        commentList.setAttribute('id', `comment-${comment.id}`)
        commentButtonLike.setAttribute('data-id', `${comment.id}`)
        commentButtonLikeCount.setAttribute('id', `count-${comment.id}`)

        commentButtonLike.addEventListener('click', handleLike.bind(null, comment.id))
        commentButtonDelete.addEventListener('click', handleDelete.bind(null, comment.id))

        commentListParagraph.innerText = comment.comment
        commentListParagraphName.innerText = comment.name
        commentListParagraphDate.innerText = new Date(comment.timestamp).toLocaleDateString("en-GB", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        commentButtonLikeCount.innerHTML = comment.likes;

        commentButtonLike.innerHTML = `
        <img src="../assets/icons/like.png" alt="Like" class="comments__buttons--button">
        `
        commentButtonDelete.innerHTML = `
        <img src="../assets/icons/delete.png" alt="Delete" class="comments__buttons--button">
        `
        commentsButtons.append(commentButtonLike, commentButtonLikeCount, commentButtonDelete);
        
        innerAvatarEmptyDiv.append(commentListParagraphName, commentListParagraphDate)
        avatarContainer.appendChild(innerAvatarEmptyDiv)
        avatarContainer.appendChild(commentListParagraph)
        avatarContainer.appendChild(commentsButtons)
        
        commentList.appendChild(avatar)
        commentList.appendChild(avatarContainer)

        document.querySelector('.comments-default').appendChild(commentList);
        document.querySelector('.comments-default').appendChild(ticketsSeparator);
      });
    })
    .catch(error => {
      console.error('Error retrieving comments:', error);
    });
}

const submitComment = document.getElementById('submit-comment');

submitComment.addEventListener("click", sendComment);

function sendComment() {
  const nameValue = document.querySelector('#name').value;
  const commentValue = document.querySelector('#comment').value;

  const newComment = {
    name: nameValue,
    comment: commentValue
  }

  if (commentValue == "") {
    document.querySelector('#comment').style.borderColor = "#D22D2D";
    return;
  }
  else {
    document.querySelector('#comment').style.borderColor = "#E1E1E1";
  }

  if (nameValue == "") {
    document.querySelector('#name').style.borderColor = "#D22D2D";
    return;
  }
  else {
    document.querySelector('#name').style.borderColor = "#E1E1E1";
  }

  axios.post(url + `comments?api_key=${apiKey}`, newComment).then((response) => {
    console.log(`bio-comments.js - line: 95 ->> response`, response)

    const commentList = document.createElement('div');
    const avatar = document.createElement('div');
    const avatarContainer = document.createElement('div');
    const innerAvatarEmptyDiv = document.createElement('div')
    const commentListParagraph = document.createElement('p')
    const commentListParagraphName = document.createElement('p')
    const commentListParagraphDate = document.createElement('p')
    const ticketsSeparator = document.createElement('hr');


    const commentsButtons = document.createElement('div');
    const commentButtonLike = document.createElement('button');
    const commentButtonDelete = document.createElement('button');
    const commentButtonLikeCount = document.createElement('p');

  
    ticketsSeparator.classList.add('tickets__separator');
    commentList.classList.add('comment-list');
    avatar.classList.add('avatar');
    avatarContainer.classList.add('avatar__container');
    commentListParagraph.classList.add('comment-list__paragraph');
    commentListParagraphName.classList.add('comment-list__paragraph', 'is--bolded')
    commentListParagraphDate.classList.add('comment-list__paragraph', 'is--grey')
    commentButtonLikeCount.classList.add('comment-list__paragraph')
    commentButtonLike.classList.add('comment-list__button')
    commentButtonDelete.classList.add('comment-list__button')
  
    commentList.setAttribute('id', `comment-${response.data.id}`)
    commentButtonLike.setAttribute('data-id', `${response.data.id}`)
    commentButtonLikeCount.setAttribute('id', `count-${response.data.id}`)

    commentButtonLike.addEventListener('click', handleLike.bind(null, response.data.id))
    commentButtonDelete.addEventListener('click', handleDelete.bind(null, response.data.id))

    commentListParagraph.innerText = response.data.comment
    commentListParagraphName.innerText = response.data.name
    commentListParagraphDate.innerText = new Date(response.data.timestamp).toLocaleDateString("en-GB", {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })

    commentButtonLikeCount.innerHTML = response.data.likes;
    commentButtonLike.innerHTML = `
    <img src="../assets/icons/like.png" alt="Like" class="comments__buttons--button">
    `
    commentButtonDelete.innerHTML = `
    <img src="../assets/icons/delete.png" alt="Delete" class="comments__buttons--button">
    `
    commentsButtons.append(commentButtonLike, commentButtonLikeCount, commentButtonDelete);
    innerAvatarEmptyDiv.append(commentListParagraphName, commentListParagraphDate)
    avatarContainer.appendChild(innerAvatarEmptyDiv)
    avatarContainer.appendChild(commentListParagraph)
    avatarContainer.appendChild(commentsButtons)
    
    commentList.appendChild(avatar)
    commentList.appendChild(avatarContainer)
  
    document.querySelector('.comments-default').prepend(ticketsSeparator);
    document.querySelector('.comments-default').prepend(commentList);

    // clear form
    document.querySelector('#name').value = "";
    document.querySelector('#comment').value = "";
  })}


// DIVING DEEPER

function handleLike(id, event) { //function for likes
  event.stopPropagation() // stop event from triggering other on click events

  const likeCountById = document.getElementById(`count-${id}`)

  axios.put(url + `comments/${id}/like?api_key=${apiKey}`)
  .then((response) => {
    if (response.status === 200) {
      likeCountById.innerText = response.data.likes;
    }
  }).catch((error) =>{
    console.error(`Like error`, error);
  })
}

// NOT FINISHED

function handleDelete(id, event) { // function for deleting comments
  event.stopPropagation(); // stop event from triggering other on click events
  
  const commentElement = document.getElementById(`comment-${id}`);
  const commentSeparator = commentElement.nextElementSibling;

  axios.delete(url + `comments/${id}/?api_key=${apiKey}`)
    .then((response) => {

      if (response.status === 200) {
        commentElement.remove();
        commentSeparator.remove();
      }

    })
    .catch((error) => {
      console.error(`Delete error`, error);
    });
}
