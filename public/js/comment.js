// Function to handle the submission of a comment form
async function commentFormHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the value of the comment text from the textarea
    const text = document
        .querySelector('textarea[name="comment-body"]')
        .value.trim();

    // Extract the post ID from the current URL
    const post_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    // Check if the comment text is not empty
    if (text) {
        // Send a POST request to create a new comment
        const response = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({
                post_id,
                text,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Check if the request was successful
        if (response.ok) {
            // Reload the page to show the new comment
            document.location.reload();
        } else {
            // Display an alert if there was an error
            alert(response.statusText);
        }
    }
}

// Attach the commentFormHandler function to the submit event of the comment form
document
    .querySelector(".comment-form")
    .addEventListener("submit", commentFormHandler);
