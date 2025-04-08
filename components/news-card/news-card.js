// Update the news-card.js file

export function createNewsCard({ image, category, title, excerpt, timeAgo, comments, likes = 0 }) {
  const card = document.createElement('article');
  card.className = 'news-card';

  card.innerHTML = `
    <div class="news-image" style="background-image: url('${image}')"></div>
    <div class="news-content">
      <div class="news-header">
        <span class="news-category">${category}</span>
        <div class="like-button" data-likes="${likes}">
          <i class="like-icon">♥</i>
          <span class="likes-count">${likes}</span>
        </div>
      </div>
      <h3 class="news-title">${title}</h3>
      <p class="news-excerpt">${excerpt}</p>
      <div class="news-meta">
        <span>${timeAgo}</span>
        <span>${comments} comments</span>
      </div>
    </div>
  `;

  // Add like/upvote functionality with proper event handling
  const likeButton = card.querySelector('.like-button');
  const likesCountDisplay = card.querySelector('.likes-count');
  
  // Initialize state based on localStorage if available
  const cardId = `news-${title.replace(/\s+/g, '-').toLowerCase()}`;
  let liked = localStorage.getItem(cardId) === 'liked';
  
  // Set initial state of the like button
  if (liked) {
    likeButton.classList.add('liked');
  }

  likeButton.addEventListener('click', (e) => {
    // Important: Stop propagation to prevent card click from triggering
    e.stopPropagation();
    
    let currentLikes = parseInt(likesCountDisplay.textContent);
    
    if (!liked) {
      currentLikes++;
      likeButton.classList.add('liked');
      liked = true;
      localStorage.setItem(cardId, 'liked');
    } else {
      currentLikes--;
      likeButton.classList.remove('liked');
      liked = false;
      localStorage.removeItem(cardId);
    }
    
    likesCountDisplay.textContent = currentLikes;
  });

  return card;
}

// Add necessary styles
function addNewsCardStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .news-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    
    .like-button {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border-radius: 20px;
      background-color: rgba(0, 0, 0, 0.05);
      cursor: pointer;
      transition: background-color 0.2s;
      z-index: 10; /* Ensure it's above other elements */
    }
    
    body.dark-mode .like-button {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .like-button:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    
    body.dark-mode .like-button:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }
    
    .like-icon {
      color: #ccc;
      font-size: 14px;
      transition: color 0.2s, transform 0.2s;
    }
    
    .like-button.liked .like-icon {
      color: #e74c3c;
      transform: scale(1.2);
    }
    
    .like-button.liked {
      background-color: rgba(231, 76, 60, 0.1);
    }
    
    body.dark-mode .like-button.liked {
      background-color: rgba(231, 76, 60, 0.2);
    }
    
    .likes-count {
      font-size: 0.8rem;
      color: #666;
    }
    
    body.dark-mode .likes-count {
      color: #bbb;
    }
  `;
  document.head.appendChild(styleElement);
}

// Call this function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', addNewsCardStyles);