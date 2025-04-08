// Forum reply popup functionality
import { forumPosts } from '../forum-item/data/forum-item-data.js';

// Enhanced forum item with popup functionality
export function createForumItem({ title, author, replies, status, likes }) {
  const li = document.createElement('li');
  li.className = 'forum-item';

  li.innerHTML = `
    <div class="forum-title">${title}</div>
    <div class="forum-meta">
      <span>by ${author}</span>
      <div class="forum-stats">
        <span class="upvote-btn">
          <i class="upvote-icon">▲</i>
          <span class="likes-count">${likes}</span>
        </span>
        <span>${replies} replies</span>
        <span class="status-badge ${status.toLowerCase()}">${status}</span>
      </div>
    </div>
  `;

  // Generate a unique ID for this forum item
  const forumId = `forum-${title.replace(/\s+/g, '-').toLowerCase()}`;
  
  // Add like/upvote functionality
  const upvoteBtn = li.querySelector('.upvote-btn');
  const likesCountDisplay = li.querySelector('.likes-count');
  let liked = localStorage.getItem(forumId) === 'liked';
  
  // Set initial state
  if (liked) {
    upvoteBtn.classList.add('liked');
  }

  upvoteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event bubbling
    
    if (!liked) {
      likes++;
      upvoteBtn.classList.add('liked');
      liked = true;
      localStorage.setItem(forumId, 'liked');
    } else {
      likes--;
      upvoteBtn.classList.remove('liked');
      liked = false;
      localStorage.removeItem(forumId);
    }
    
    likesCountDisplay.textContent = likes;
  });

  // Add click event to show popup
  li.addEventListener('click', () => {
    showForumPopup({
      title,
      author,
      replies,
      status,
      likes: parseInt(likesCountDisplay.textContent), // Get current likes count
      forumId // Pass the ID to maintain like state
    });
  });

  // Add styling for the forum items
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .forum-stats {
      display: flex;
      gap: 15px;
      align-items: center;
    }
    
    .upvote-btn {
      display: flex;
      align-items: center;
      gap: 3px;
      cursor: pointer;
      padding: 2px 5px;
      border-radius: 4px;
      transition: background-color 0.2s;
    }
    
    .upvote-btn:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
    
    body.dark-mode .upvote-btn:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .upvote-icon {
      font-size: 12px;
      color: #999;
      transition: color 0.2s;
    }
    
    .upvote-btn.liked .upvote-icon {
      color: var(--secondary-color);
    }
    
    .status-badge {
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 0.75rem;
      background-color: #f0f0f0;
    }
    
    body.dark-mode .status-badge {
      background-color: #444;
    }
    
    .status-badge.hot {
      background-color: #ff7675;
      color: white;
    }
    
    .status-badge.trending {
      background-color: #74b9ff;
      color: white;
    }
    
    .status-badge.active {
      background-color: #55efc4;
      color: #2d3436;
    }
    
    .status-badge.new {
      background-color: #a29bfe;
      color: white;
    }
    
    /* Make forum items clickable */
    .forum-item {
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .forum-item:hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
    
    body.dark-mode .forum-item:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  `;
  document.head.appendChild(styleElement);

  return li;
}

// Generate mock reply data for the forum
function generateMockReplies(count) {
  const users = ['TechGuru', 'CodeMaster', 'QuantumThinker', 'DevPro', 'AIEnthusiast', 'FutureForward', 'DigitalNomad'];
  const replies = [];
  
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setHours(date.getHours() - Math.floor(Math.random() * 72)); // Random time in the last 72 hours
    
    replies.push({
      author: users[Math.floor(Math.random() * users.length)],
      text: `This is a ${i === 0 ? 'thoughtful' : 'meaningful'} reply to the discussion. It contains some ${i % 2 === 0 ? 'interesting points' : 'valid arguments'} about the topic at hand.`,
      timestamp: date,
      likes: Math.floor(Math.random() * 25)
    });
  }
  
  // Sort by timestamp (newest first)
  return replies.sort((a, b) => b.timestamp - a.timestamp);
}

// Format date for display
function formatDate(date) {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // difference in seconds
  
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
  
  // If older than a month, show the actual date
  return date.toLocaleDateString();
}

// Create and show popup with forum details and replies
function showForumPopup(forumItem) {
  // Create popup overlay
  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';
  
  // Generate mock replies based on the reply count
  const mockReplies = generateMockReplies(forumItem.replies > 5 ? 5 : forumItem.replies);
  
  // Create popup content
  const popup = document.createElement('div');
  popup.className = 'forum-popup';
  
  // Create the replies HTML
  let repliesHTML = '';
  mockReplies.forEach(reply => {
    repliesHTML += `
      <div class="forum-reply">
        <div class="reply-header">
          <span class="reply-author">${reply.author}</span>
          <span class="reply-time">${formatDate(reply.timestamp)}</span>
        </div>
        <div class="reply-content">${reply.text}</div>
        <div class="reply-actions">
          <button class="reply-like-btn">
            <i class="like-icon">♥</i> ${reply.likes}
          </button>
          <button class="reply-btn">Reply</button>
        </div>
      </div>
    `;
  });
  
  popup.innerHTML = `
    <div class="popup-header">
      <span class="forum-status-badge ${forumItem.status.toLowerCase()}">${forumItem.status}</span>
      <div class="popup-actions-top">
        <div class="upvote-btn popup-upvote-btn">
          <i class="upvote-icon">▲</i>
          <span class="likes-count">${forumItem.likes}</span>
        </div>
        <button class="popup-close-btn">&times;</button>
      </div>
    </div>
    <div class="popup-content">
      <h2 class="popup-title">${forumItem.title}</h2>
      <div class="popup-meta">
        <span>Posted by <strong>${forumItem.author}</strong></span>
        <span>${forumItem.replies} replies</span>
      </div>
      
      <div class="forum-replies">
        <h3>Replies</h3>
        ${repliesHTML}
      </div>
      
      <div class="reply-form">
        <h3>Join the discussion</h3>
        <textarea placeholder="Write your reply here..."></textarea>
        <button class="btn btn-primary submit-reply-btn">Submit Reply</button>
      </div>
    </div>
  `;
  
  // Append popup to overlay and overlay to body
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
  
  // Prevent scrolling of the background
  document.body.style.overflow = 'hidden';
  
  // Apply blur effect to all main content elements
  applyBlurToMainContent(true);
  
  // Sync like button state from localStorage
  const popupUpvoteBtn = popup.querySelector('.popup-upvote-btn');
  const popupLikesCount = popup.querySelector('.likes-count');
  let liked = localStorage.getItem(forumItem.forumId) === 'liked';
  
  if (liked) {
    popupUpvoteBtn.classList.add('liked');
  }
  
  // Add like functionality in the popup
  popupUpvoteBtn.addEventListener('click', () => {
    let currentLikes = parseInt(popupLikesCount.textContent);
    
    if (!liked) {
      currentLikes++;
      popupUpvoteBtn.classList.add('liked');
      liked = true;
      localStorage.setItem(forumItem.forumId, 'liked');
    } else {
      currentLikes--;
      popupUpvoteBtn.classList.remove('liked');
      liked = false;
      localStorage.removeItem(forumItem.forumId);
    }
    
    popupLikesCount.textContent = currentLikes;
    
    // Update the item's like count in the background
    const forumListItem = document.querySelector(`.forum-item:nth-child(${forumPosts.findIndex(post => post.title === forumItem.title) + 1})`);
    if (forumListItem) {
      const likesCount = forumListItem.querySelector('.likes-count');
      likesCount.textContent = currentLikes;
      const upvoteBtn = forumListItem.querySelector('.upvote-btn');
      if (liked) {
        upvoteBtn.classList.add('liked');
      } else {
        upvoteBtn.classList.remove('liked');
      }
    }
  });
  
  // Add submit functionality
  const submitBtn = popup.querySelector('.submit-reply-btn');
  const replyTextarea = popup.querySelector('textarea');
  
  submitBtn.addEventListener('click', () => {
    const replyText = replyTextarea.value.trim();
    if (replyText) {
      // In a real app, this would send the reply to a server
      alert(`Reply submitted: "${replyText}"`);
      replyTextarea.value = '';
    } else {
      alert('Please write a reply before submitting.');
    }
  });
  
  // Add reply button functionality
  const replyButtons = popup.querySelectorAll('.reply-btn');
  replyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Scroll to reply form and focus the textarea
      replyTextarea.focus();
    });
  });
  
  // Add close button event listener
  const closeBtn = popup.querySelector('.popup-close-btn');
  closeBtn.addEventListener('click', () => {
    closePopup(overlay);
  });
  
  // Close when clicking outside the popup
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closePopup(overlay);
    }
  });
  
  // Add keyboard event listener to close popup on ESC key
  document.addEventListener('keydown', handleKeyDown);
  
  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      closePopup(overlay);
      document.removeEventListener('keydown', handleKeyDown);
    }
  }
}

// Function to apply/remove blur to main content elements
function applyBlurToMainContent(apply) {
  // Target all main content sections
  const elementsToBlur = [
    '.container',
    '.site-header',
    '.hero',
    '#breadcrumb-container',
    '#header-container',
    '.main-content',
    '.news-section',
    '.trending-forums',
    '.categories',
    '#footer-container'
  ];
  
  elementsToBlur.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (apply) {
        element.classList.add('blur-background');
      } else {
        element.classList.remove('blur-background');
      }
    });
  });
}

// Function to close popup and restore normal state
function closePopup(overlay) {
  // Remove blur effect from all elements
  applyBlurToMainContent(false);
  
  // Allow scrolling again
  document.body.style.overflow = '';
  
  // Remove the overlay
  document.body.removeChild(overlay);
}

// Add styles for popup
function addForumPopupStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      padding: 20px;
      backdrop-filter: blur(2px);
    }
    
    .forum-popup {
      background-color: var(--light-card);
      border-radius: var(--border-radius);
      overflow: hidden;
      width: 100%;
      max-width: 700px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      animation: popup-fade-in 0.3s ease-out;
      z-index: 1001;
    }
    
    body.dark-mode .forum-popup {
      background-color: var(--dark-card);
      color: var(--dark-mode-text);
    }
    
    /* Blur effect for background elements */
    .blur-background {
      filter: blur(5px);
      transition: filter 0.3s ease;
    }
    
    @keyframes popup-fade-in {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .popup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    body.dark-mode .popup-header {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .popup-actions-top {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .popup-close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #999;
      transition: color 0.3s;
      padding: 0;
      line-height: 1;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
    }
    
    .popup-close-btn:hover {
      color: var(--accent-color);
      background-color: rgba(0, 0, 0, 0.05);
    }
    
    body.dark-mode .popup-close-btn:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
    
    .popup-content {
      padding: 20px;
    }
    
    .popup-title {
      font-size: 1.5rem;
      margin-bottom: 15px;
    }
    
    .popup-meta {
      display: flex;
      justify-content: space-between;
      color: #999;
      margin-bottom: 20px;
      font-size: 0.9rem;
    }
    
    /* Forum status badge in popup */
    .forum-status-badge {
      padding: 4px 10px;
      border-radius: 10px;
      font-size: 0.75rem;
      background-color: #f0f0f0;
    }
    
    body.dark-mode .forum-status-badge {
      background-color: #444;
    }
    
    .forum-status-badge.hot {
      background-color: #ff7675;
      color: white;
    }
    
    .forum-status-badge.trending {
      background-color: #74b9ff;
      color: white;
    }
    
    .forum-status-badge.active {
      background-color: #55efc4;
      color: #2d3436;
    }
    
    .forum-status-badge.new {
      background-color: #a29bfe;
      color: white;
    }
    
    /* Forum replies section */
    .forum-replies {
      margin: 20px 0;
    }
    
    .forum-replies h3 {
      margin-bottom: 15px;
      font-size: 1.2rem;
      color: #444;
    }
    
    body.dark-mode .forum-replies h3 {
      color: #ddd;
    }
    
    .forum-reply {
      padding: 15px;
      border: 1px solid #eee;
      border-radius: var(--border-radius);
      margin-bottom: 15px;
    }
    
    body.dark-mode .forum-reply {
      border-color: rgba(255, 255, 255, 0.1);
    }
    
    .reply-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 0.9rem;
    }
    
    .reply-author {
      font-weight: 600;
      color: var(--secondary-color);
    }
    
    .reply-time {
      color: #999;
    }
    
    .reply-content {
      margin-bottom: 10px;
      line-height: 1.5;
    }
    
    .reply-actions {
      display: flex;
      gap: 10px;
    }
    
    .reply-like-btn, .reply-btn {
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
      font-size: 0.8rem;
      padding: 5px 10px;
      border-radius: 4px;
      transition: background-color 0.2s;
    }
    
    body.dark-mode .reply-like-btn, 
    body.dark-mode .reply-btn {
      color: #bbb;
    }
    
    .reply-like-btn:hover, .reply-btn:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
    
    body.dark-mode .reply-like-btn:hover,
    body.dark-mode .reply-btn:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
    
    /* Reply form */
    .reply-form {
      margin-top: 30px;
    }
    
    .reply-form h3 {
      margin-bottom: 15px;
      font-size: 1.2rem;
      color: #444;
    }
    
    body.dark-mode .reply-form h3 {
      color: #ddd;
    }
    
    .reply-form textarea {
      width: 100%;
      min-height: 100px;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ddd;
      border-radius: var(--border-radius);
      resize: vertical;
      font-family: inherit;
      font-size: 0.9rem;
    }
    
    body.dark-mode .reply-form textarea {
      background-color: #3a3f50;
      border-color: #555;
      color: var(--dark-mode-text);
    }
    
    .reply-form textarea:focus {
      outline: none;
      border-color: var(--secondary-color);
    }
    
    .submit-reply-btn {
      background-color: var(--secondary-color);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: var(--border-radius);
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.2s;
    }
    
    .submit-reply-btn:hover {
      background-color: #2980b9;
    }
    
    /* Other button styles */
    .btn {
      padding: 8px 16px;
      border-radius: var(--border-radius);
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .btn-primary {
      background-color: var(--secondary-color);
      color: white;
      border: none;
    }
    
    .btn-primary:hover {
      background-color: #2980b9;
    }
    
    .btn-outline {
      background: none;
      border: 1px solid var(--secondary-color);
      color: var(--secondary-color);
    }
    
    .btn-outline:hover {
      background-color: rgba(52, 152, 219, 0.1);
    }
    
    @media (max-width: 768px) {
      .forum-popup {
        max-width: 95%;
      }
    }
  `;
  document.head.appendChild(styleElement);
}

// Add the popup styles when this module is imported
document.addEventListener('DOMContentLoaded', () => {
  addForumPopupStyles();
});
