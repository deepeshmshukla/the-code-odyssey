// Initialize data
let isLiked = false;
let likeCount = 100;
let comments = [];

// Toggle like function
function toggleLike() {
    const likeIcon = document.getElementById("likeBtn");
    const likesCount = document.getElementById("likesCount");

    // Toggle like/unlike
    isLiked = !isLiked;

    if (isLiked) {
        likeIcon.classList.remove("fa-heart"); // Remove the empty heart class
        likeIcon.classList.add("fa-heart-solid", "liked"); // Add solid heart and liked class (red)
        likesCount.textContent = `${++likeCount} likes`; // Update likes count
    } else {
        likeIcon.classList.remove("fa-heart-solid", "liked"); // Remove solid heart and liked class
        likeIcon.classList.add("fa-heart"); // Add the empty heart class back
        likesCount.textContent = `${--likeCount} likes`; // Update likes count
    }
}

// Comment-related functionality remains the same
function toggleCommentSection() {
    const commentSection = document.getElementById("commentsSection");
    commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
}

function addComment(event) {
    if (event.key === "Enter") {
        const commentInput = document.getElementById("commentInput");
        const commentText = commentInput.value.trim();
        if (commentText) {
            comments.push(commentText);
            displayComments();
            commentInput.value = ""; // Clear input after comment
        }
    }
}

function displayComments() {
    const commentsList = document.getElementById("commentsList");
    commentsList.innerHTML = ""; // Clear the comment list
    comments.forEach(comment => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="comment-text">${comment}</span>`;
        commentsList.appendChild(li);
    });
}

// Share Popup functionality
function toggleSharePopup() {
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
