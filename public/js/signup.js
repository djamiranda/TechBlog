// Function to handle user signup form submission
const signupFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the signup form
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    // Check if both username and password are provided
    if (username && password) {
        // Send a POST request to the API endpoint for user registration
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // Check if the signup request was successful
        if (response.ok) {
            // If successful, redirect the user to the dashboard
            document.location.replace('/dashboard');
        } else {
            // Display an alert if there was an error during signup
            alert(response.statusText);
        }
    }
};

// Attach the signupFormHandler function to the submit event of the signup form
document
    .querySelector('#signup')
    .addEventListener('submit', signupFormHandler);
