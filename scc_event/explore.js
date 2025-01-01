// Initialize data for each post
let isLiked = Array(10).fill(false); // For each post, false indicates not liked
let likeCount = Array(10).fill(100);  // All posts start with 100 likes
let comments = Array(10).fill([]);    // Array of comments for each post

// Toggle like function
function toggleLike(postId) {
    const likeIcon = document.querySelector(`#post-${postId} .fa-heart`);
    const likesCount = document.getElementById(`likesCount-${postId}`);

    isLiked[postId - 1] = !isLiked[postId - 1];  // Toggle like state

    if (isLiked[postId - 1]) {
        likeIcon.classList.add("liked");
        likeIcon.classList.remove("fa-heart");
        likeIcon.classList.add("fa-heart-solid");
        likesCount.textContent = `${++likeCount[postId - 1]} likes`;
    } else {
        likeIcon.classList.remove("liked");
        likeIcon.classList.remove("fa-heart-solid");
        likeIcon.classList.add("fa-heart");
        likesCount.textContent = `${--likeCount[postId - 1]} likes`;
    }
}

// Toggle comment section
function toggleCommentSection(postId) {
    const commentSection = document.getElementById(`commentsSection-${postId}`);
    commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
}

// Add comment function
function addComment(event, postId) {
    if (event.key === "Enter") {
        const commentInput = document.getElementById(`commentInput-${postId}`);
        const commentText = commentInput.value.trim();
        if (commentText) {
            comments[postId - 1].push(commentText);  // Add comment to the post
            displayComments(postId);
            commentInput.value = ""; // Clear the input field
        }
    }
}

// Display comments for a post
function displayComments(postId) {
    const commentsList = document.getElementById(`commentsList-${postId}`);
    commentsList.innerHTML = "";  // Clear the comment list

    comments[postId - 1].forEach(comment => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="comment-text">${comment}</span>`;
        commentsList.appendChild(li);
    });
}

// Share Popup functionality
function toggleSharePopup(postId) {
    const sharePopup = document.getElementById("sharePopup");
    const overlay = document.getElementById("overlay");
    sharePopup.style.display = "block";
    overlay.style.display = "block";
}

function closeSharePopup() {
    const sharePopup = document.getElementById("sharePopup");
    const overlay = document.getElementById("overlay");
    sharePopup.style.display = "none";
    overlay.style.display = "none";
}

function sharePost() {
    alert("Post shared!");
}

// Search functionality (filter posts by caption)
function searchPosts() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const caption = post.querySelector('.caption').textContent.toLowerCase();
        if (caption.includes(searchQuery)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}
