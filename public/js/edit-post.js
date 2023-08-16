// Function to handle the submission of an edit form for a post
async function editFormHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the updated title and contents from the respective input fields
    const title = document.querySelector('#title').value;
    const contents = document.querySelector('#content').value;

    // Extract the post ID from the current URL
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Send a PUT request to update the post
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            contents
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Check if the request was successful
    if (response.ok) {
        // Redirect to the dashboard page after updating the post
        document.location.replace('/dashboard/');
    } else {
        // Display an alert if there was an error
        alert(response.statusText);
    }
}

// Function to handle the submission of a delete form for a post
async function deleteFormHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Extract the post ID from the current URL
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Send a DELETE request to delete the post
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Check if the request was successful
    if (response.ok) {
        // Redirect to the dashboard page after deleting the post
        document.location.replace('/dashboard/');
    } else {
        // Display an alert if there was an error
        alert(response.statusText);
    }
}

// Attach the editFormHandler function to the submit event of the edit post form
document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);

// Attach the deleteFormHandler function to the click event of the delete button
document.querySelector('#delete').addEventListener('click', deleteFormHandler);
