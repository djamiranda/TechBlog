// Function to handle the submission of a new post form
const newFormHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the values of the title and contents inputs
    const title = document.querySelector('#title').value.trim();
    const contents = document.querySelector('#content').value.trim();

    // Check if both the title and contents inputs are not empty
    if (title && contents) {
        // Send a POST request to create a new post
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ title, contents }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the request was successful
        if (response.ok) {
            // Redirect to the dashboard page after creating the post
            document.location.replace('/dashboard');
        } else {
            // Display an alert if there was an error
            alert('Failed to create post');
        }
    }
};

// Attach the newFormHandler function to the submit event of the new post form
document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);
