// Function to handle the submission of the login form
const loginFormHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Collect values from the login form inputs
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    // Check if both username and password are provided
    if (username && password) {
        // Send a POST request to the API endpoint for user login
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // Check if the request was successful
        if (response.ok) {
            // If successful, redirect the user to the dashboard page
            document.location.href = '/dashboard';
        } else {
            // Display an alert if there was an error
            alert(response.statusText);
        }
    }
};

// Attach the loginFormHandler function to the click event of the login button
document.querySelector('#login').addEventListener('click', loginFormHandler);
