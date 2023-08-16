// Function to handle user logout
async function logout() {
    // Send a POST request to the API endpoint for user logout
    const response = await fetch('/api/users/logout', {
        method: 'POST', // Use the POST method to perform a logout action
        headers: { 'Content-Type': 'application/json' }
    });

    // Check if the logout request was successful
    if (response.ok) {
        // If successful, redirect the user to the homepage
        document.location.replace('/'); // Redirects to the homepage after logout
    } else {
        // Display an alert if there was an error during logout
        alert(response.statusText);
    }
}

// Attach the logout function to the click event of the logout button
document.querySelector('#logout').addEventListener('click', logout);
