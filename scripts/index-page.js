// Initialize an array of comments with 3 default comment objects
const comments = [
  {
    name: 'Connor Walton',
    timestamp: '02/17/2021',
    text: 'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.'
  },
  {
    name: 'Emilie Beach',
    timestamp: '01/09/2021',
    text: 'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.'
  },
  {
    name: 'Miles Acosta',
    timestamp: '12/20/2020',
    text: 'I can\'t stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can\'t get enough.'
  }
];

const form = document.querySelector('form');
const commentList = document.querySelectorAll('.comment-list');
const commentSection = document.querySelector('.comments__section')

const commentsDefault = document.querySelector('.comments-default');

// default comments section using DOM
comments.forEach(comment => {
  displayComment(comment);
})

function displayComment(comment) {
  // console.log("test")
  const divCommentList = document.createElement('div');
  divCommentList.classList.add('comment-list');
  
  const avatar = document.createElement('div');
  avatar.classList.add('avatar');
  divCommentList.appendChild(avatar);

  const avatarContainer = document.createElement('div');
  avatarContainer.classList.add('avatar__container');
  divCommentList.appendChild(avatarContainer);

  const div = document.createElement('div');
  avatarContainer.appendChild(div);

  // Get the name field from array
  const name = comment.name;
  const nameElement = document.createElement('p');
  nameElement.textContent = name;
  nameElement.classList.add ('comment-list__paragraph', 'is--bolded');
  div.appendChild(nameElement);
  
// Get timestamp for the comment from array
  const timeZone = document.createElement('p');
  timeZone.classList.add('comment-list__paragraph', 'is--grey');
  div.appendChild(timeZone);
  timeZone.textContent = comment.timestamp;

// Get text of the comment from array
  const commentBody = comment.text;
  const commentContainer = document.createElement('p');
  commentContainer.classList.add('comment-list__paragraph');
  commentContainer.textContent = commentBody;
  avatarContainer.appendChild(commentContainer);
  
  commentsDefault.appendChild(divCommentList);
  
  const ticketsSeparator = document.createElement('hr');
  ticketsSeparator.classList.add('tickets__separator');
  commentsDefault.appendChild(ticketsSeparator);
}


// Add an event listener to the form to handle submission of a new comment
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (document.querySelector('#comment').value == "") {
    document.querySelector('#comment').style.borderColor = "#D22D2D";
    return "";
  }
  else {
    document.querySelector('#comment').style.borderColor = "#E1E1E1";
  }

  if (document.querySelector('#name').value == "") {
    document.querySelector('#name').style.borderColor = "#D22D2D";
    return "";
  }
  else {
    document.querySelector('#name').style.borderColor = "#E1E1E1";
  }

  // Get the input value for the name field
  const name = document.querySelector('#name').value;
  
// Get the current timestamp for the comment
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const timestampString = `${month}/${day}/${year} ${hours}:${minutes}`;

// Add the text of the comment to the comment div
  const comment = document.querySelector('#comment').value;

  let commentObj = {}
  commentObj.name = name;
  commentObj.timestamp = timestampString;
  commentObj.text = comment;
  comments.unshift(commentObj); //push new comment to the array

  document.querySelector('#name').value = ''; //reset the form 
  document.querySelector('#comment').value = '';
 
  while (commentsDefault.firstChild) {
    commentsDefault.removeChild(commentsDefault.firstChild)
  }

  comments.forEach(comment => {
    displayComment(comment);
  })

  

});

