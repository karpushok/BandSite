// Global variable to store API key
let apiKey;
const url = 'https://project-1-api.herokuapp.com/';

// Function to retrieve API key from server
function registerWithApi(url) {
  axios.get(url + 'register')
    .then(response => {
      // Save API key in global variable
      apiKey = response.data.api_key;

      console.log(`bio-comments.js - line: 12 ->> apiKey`, apiKey)

      // Save API key in global variable
      getCommentsAndAppendToDom(url);
    })
    .catch(error => {
      console.error('Registration error:', error);
    });
}

// Get API key from server
registerWithApi(url);

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
      comments.forEach(comment => {
        const commentList = document.createElement('div');
        const avatar = document.createElement('div');
        const avatarContainer = document.createElement('div');
        const innerAvatarEmptyDiv = document.createElement('div')
        const commentListParagraph = document.createElement('p')
        const commentListParagraphName = document.createElement('p')
        const commentListParagraphDate = document.createElement('p')
        const ticketsSeparator = document.createElement('hr');

        ticketsSeparator.classList.add('tickets__separator');
        commentList.classList.add('comment-list');
        avatar.classList.add('avatar');
        avatarContainer.classList.add('avatar__container');
        commentListParagraph.classList.add('comment-list__paragraph');
        commentListParagraphName.classList.add('comment-list__paragraph', 'is--bolded')
        commentListParagraphDate.classList.add('comment-list__paragraph', 'is--grey')

        commentListParagraph.innerText = comment.comment
        commentListParagraphName.innerText = comment.name
        commentListParagraphDate.innerText = new Date(comment.timestamp).toLocaleDateString("en-US")
      
        innerAvatarEmptyDiv.append(commentListParagraphName, commentListParagraphDate)
        avatarContainer.appendChild(innerAvatarEmptyDiv)
        avatarContainer.appendChild(commentListParagraph)
        
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
  
    ticketsSeparator.classList.add('tickets__separator');
    commentList.classList.add('comment-list');
    avatar.classList.add('avatar');
    avatarContainer.classList.add('avatar__container');
    commentListParagraph.classList.add('comment-list__paragraph');
    commentListParagraphName.classList.add('comment-list__paragraph', 'is--bolded')
    commentListParagraphDate.classList.add('comment-list__paragraph', 'is--grey')
  
    commentListParagraph.innerText = response.data.comment
    commentListParagraphName.innerText = response.data.name
    commentListParagraphDate.innerText = new Date(response.data.timestamp).toLocaleDateString("en-US")
  
    innerAvatarEmptyDiv.append(commentListParagraphName, commentListParagraphDate)
    avatarContainer.appendChild(innerAvatarEmptyDiv)
    avatarContainer.appendChild(commentListParagraph)
    
    commentList.appendChild(avatar)
    commentList.appendChild(avatarContainer)
  
    document.querySelector('.comments-default').prepend(ticketsSeparator);
    document.querySelector('.comments-default').prepend(commentList);

    // clear form
    document.querySelector('#name').value = "";
    document.querySelector('#comment').value = "";
  })}




