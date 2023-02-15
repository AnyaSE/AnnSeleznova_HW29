function getPostInfo() {
    let inputID = document.getElementsByTagName('input')[0].value;
    if (inputID > 0 && inputID < 101) {
        return `https://jsonplaceholder.typicode.com/posts/${inputID}`
    } else {
        console.log('There is no such post. Please enter a valid ID')
    }
};

function fetchPost() {
    const url = getPostInfo();
    fetch(url, {method: "GET"})
    .then(async (res) => {
        if (res.status === 200) {
            const response = await res.json();
            console.log(response);
            const postDisplay = document.createElement('div');
            postDisplay.innerHTML = `
            <p>ID: ${response.id} </p> <p>Title: ${response.title}</p>
            <p>Body: ${response.body}</p>`
            document.body.appendChild(postDisplay);
            const buttonComments = document.createElement('button');
            buttonComments.innerHTML = 'See comments';
            document.body.appendChild(buttonComments);
            buttonComments.addEventListener('click', () => {
            fetchComments(response.id);
            });
        } else {
            console.log ('There is no such post')
        }
    })
};   

const form = document.getElementsByTagName('form')[0];

function submitRequest() {
    form.addEventListener("submit", function(event){
        event.preventDefault();
        fetchPost();
    })
};
 
submitRequest();

function fetchComments(postId) {
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
    fetch(url, {method: "GET"})
    .then(async (res) => {
        if (res.status === 200) {
            const response = await res.json();
            console.log(response);
            const commentsDisplay = document.createElement('div');
            response.forEach((comment) => {
                const commentElement = document.createElement('div');
                commentElement.innerHTML = `
                  <p>Name: ${comment.name}</p>
                  <p>Email: ${comment.email}</p>
                `;
                commentsDisplay.appendChild(commentElement);
              });
              document.body.appendChild(commentsDisplay);
        } else {
            console.log ('There is no such post')
        }
    })
};  


