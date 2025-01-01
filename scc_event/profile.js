// Open the profile edit modal
function editProfile() {
    document.getElementById("edit-profile-modal").style.display = "flex";
  }
  
  // Close the profile edit modal
  function closeEditProfile() {
    document.getElementById("edit-profile-modal").style.display = "none";
  }
  
  // Preview the uploaded profile image
  function previewImage(event) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // Create a file reader to read the image
      reader.onload = function() {
        // Set the uploaded image as the profile picture
        document.getElementById("profile-img").src = reader.result;
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }
  
  // Handle the form submission for editing profile
  document.getElementById("edit-profile-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const bio = document.getElementById("bio").value;
  
    // Update profile details
    document.getElementById("profile-name").textContent = name;
    document.getElementById("profile-bio").textContent = bio;
  
    // Close modal
    closeEditProfile();
  });
  
  // Toggle Like button state
  function toggleLike(button) {
    const icon = button.querySelector("i");
    if (icon.classList.contains("far")) {
      icon.classList.remove("far");
      icon.classList.add("fas"); // Change to solid heart
    } else {
      icon.classList.remove("fas");
      icon.classList.add("far"); // Change back to outline heart
    }
  }
  
  // Toggle Comment section visibility
  function toggleCommentSection(button) {
    const post = button.closest(".post");
    const commentSection = post.querySelector(".comment-section");
    commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
  }
  
  // Simulate post share action
  function sharePost() {
    alert("Post shared!");
  }
  