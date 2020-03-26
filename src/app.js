import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Get Posts
function getPosts() {
    http.get(http.url)
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}

// Submit Post
function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;

    const data = {
        title,
        body
    };

    // Create Post
    http.post(http.url, data)
        .then(data => {
            ui.showAlert('Post Added', 'alert alert-success');
            ui.clearFields();

            getPosts();
        })
        .catch(err => console.log(err));
}

// Enable Edit State
function enableEdit(e) {
    e.preventDefault();

    if (e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;

        const data = {
            id,
            title,
            body
        };

        // Fill form with current post
        ui.fillForm(data);
    }
}
