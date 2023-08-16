// Function to handle the submission of an edit form for a comment
async function editFormHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the new text for the comment from the title input
    const title = document.querySelector('#title').value;

    // Extract the comment ID from the current URL
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Send a PUT request to update the comment
    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            text: title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Check if the request was successful
    if (response.ok) {
        console.log('Trying to update comment');
        // Redirect to the home page after updating the comment
        document.location.replace('/');
    } else {
        // Display an alert if there was an error
        alert(response.statusText);
    }
}

// Function to handle the submission of a delete form for a comment
async function deleteFormHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Extract the comment ID from the current URL
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Send a DELETE request to delete the comment
    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Check if the request was successful
    if (response.ok) {
        // Redirect to the home page after deleting the comment
        document.location.replace('/');
    } else {
        // Display an alert if there was an error
        alert(response.statusText);
    }
}

// Attach the editFormHandler function to the submit event of the edit comment form
document.querySelector('#edit-comment-form').addEventListener('submit', editFormHandler);

// Attach the deleteFormHandler function to the click event of the delete button
document.querySelector('#delete').addEventListener('click', deleteFormHandler);
