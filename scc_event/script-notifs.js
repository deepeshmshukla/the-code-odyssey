// Define some sample notifications
const notifications = [
    { user: 'john_doe', message: 'liked your post.', time: '2m ago', type: 'like' },
    { user: 'susan_smith', message: 'commented on your photo: "Great picture!"', time: '10m ago', type: 'comment' },
    { user: 'mike_ross', message: 'started following you.', time: '30m ago', type: 'follow' },
    { user: 'jane_doe', message: 'mentioned you in a story.', time: '1h ago', type: 'mention' },
  ];
  
  // Function to create notification cards
  function createNotification(notification) {
    const card = document.createElement('div');
    card.classList.add('notification-card');
  
    // Add a corresponding icon based on the notification type
    let icon = '';
    switch (notification.type) {
      case 'like':
        icon = '❤️';
        break;
      case 'comment':
        icon = '💬';
        break;
      case 'follow':
        icon = '➕';
        break;
      case 'mention':
        icon = '@';
        break;
      default:
        icon = '🔔';
    }
  
    // Create elements inside the card
    card.innerHTML = `
      <i>${icon}</i>
      <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="${notification.user}">
      <div class="text">
        <strong>${notification.user}</strong> ${notification.message}
      </div>
      <div class="time">${notification.time}</div>
    `;
  
    return card;
  }
  
  // Add notifications to the page
  const notificationList = document.getElementById('notification-list');
  notifications.forEach(notification => {
    const notificationCard = createNotification(notification);
    notificationList.appendChild(notificationCard);
  });
  