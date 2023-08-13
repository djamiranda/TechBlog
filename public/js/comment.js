const commentFormHandler = async (event) => {
  event.preventDefault();
  // Collect comment content from the comment form
  const commentContent = document.querySelector('#comment-input').value.trim();
  // Get the blogPost ID from the URL
  const currentUrl = window.location.href; 
  const urlParts = currentUrl.split('/'); 
  const blogPostId = urlParts[urlParts.length - 1]; 
  // Create an object with comment, blogPost ID and user ID
  const commentData = {
      content: commentContent,
      blogpost_id: blogPostId
  };

  console.log(commentContent);
  console.log(blogPostId);

  if (commentContent) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/comments/blogPost/${blogPostId}`, {
      method: 'POST',
      body: JSON.stringify({ commentData }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      //document.location.replace(`/api/comments/blogPost/${blogPostId}`);
      location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
.querySelector('.comment-form')
.addEventListener('submit', commentFormHandler);
