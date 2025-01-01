const mediaInput = document.getElementById("media");
const mediaPreview = document.getElementById("mediaPreview");
const postForm = document.getElementById("postForm");
const cameraButton = document.getElementById("cameraButton");
const cameraPreview = document.getElementById("cameraPreview");
const videoElement = document.getElementById("videoElement");

// Preview uploaded media (photo or video)
mediaInput.addEventListener("change", function (e) {
    const file = e.target.files[0];

    if (file) {
        mediaPreview.innerHTML = ""; // Clear previous preview

        const reader = new FileReader();

        reader.onload = function (event) {
            const mediaElement = file.type.startsWith("image") 
                ? document.createElement("img") 
                : document.createElement("video");

            if (file.type.startsWith("image")) {
                mediaElement.src = event.target.result;
            } else {
                mediaElement.src = event.target.result;
                mediaElement.controls = true; // Add controls for videos
            }

            mediaPreview.appendChild(mediaElement);
        };

        reader.readAsDataURL(file);
    }
});

// Handle post form submission and save it to localStorage
postForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const caption = document.getElementById("caption").value;
    const media = mediaInput.files[0];

    if (caption && media) {
        const postData = {
            caption: caption,
            mediaType: media.type,
            mediaSrc: URL.createObjectURL(media),
        };

        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.push(postData);

        localStorage.setItem("posts", JSON.stringify(posts));

        window.location.href = "profile.html";
    }
});

// Open camera mode using navigator.mediaDevices.getUserMedia()
function openCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Hide the file input and show the camera preview
        mediaInput.style.display = 'none';
        cameraPreview.style.display = 'block';

        // Request camera access (video stream)
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                videoElement.srcObject = stream;
                videoElement.play();
                // Store the video stream in a global variable for later use
                window.cameraStream = stream;
            })
            .catch(function (err) {
                console.log("Error accessing camera: ", err);
                alert("Failed to access the camera.");
            });
    } else {
        alert("Camera is not supported on this device.");
    }
}

// Capture an image from the video stream
function captureImage() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set canvas size to match video element
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Draw the current frame from the video stream onto the canvas
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Convert the captured image to a data URL
    const imageDataUrl = canvas.toDataURL("image/png");

    // Display the captured image in the preview section
    mediaPreview.innerHTML = `<img src="${imageDataUrl}" alt="Captured Image" />`;

    // Stop the camera stream after capturing the image
    window.cameraStream.getTracks().forEach(track => track.stop());
    cameraPreview.style.display = 'none';
    mediaInput.style.display = 'block'; // Show the file input again
}

// Load and display posts on the profile page
if (window.location.pathname.includes("profile.html")) {
    const profilePosts = document.getElementById("profilePosts");
    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.forEach(post => {
        const postCard = document.createElement("div");
        postCard.classList.add("post-card");

        const mediaElement = document.createElement(post.mediaType.startsWith("image") ? "img" : "video");
        mediaElement.src = post.mediaSrc;
        if (post.mediaType.startsWith("video")) {
            mediaElement.controls = true;
        }

        const captionElement = document.createElement("div");
        captionElement.classList.add("caption");
        captionElement.textContent = post.caption;

        postCard.appendChild(mediaElement);
        postCard.appendChild(captionElement);
        profilePosts.appendChild(postCard);
    });
}
