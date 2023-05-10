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

const newUser = {
  "name": "Nigel",
  "comment": "What a cool site"
}

function sendComment() {

  axios.post(url + `comments?api_key=1b0f1b14-dce0-4dea-bc62-fcefbb95e821`, newUser).then((response) => {
      console.log(`bio-comments.js - line: 95 ->> response`, response)
  })

}




