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

  // Add like/upvote functionality
  const upvoteBtn = li.querySelector('.upvote-btn');
  const likesCountDisplay = li.querySelector('.likes-count');
  let liked = false;

  upvoteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event bubbling if there are other click handlers

    if (!liked) {
      likes++;
      upvoteBtn.classList.add('liked');
      liked = true;
    } else {
      likes--;
      upvoteBtn.classList.remove('liked');
      liked = false;
    }
    
    likesCountDisplay.textContent = likes;
    
    // You might want to save this to a database or localStorage in a real app
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
  `;
  document.head.appendChild(styleElement);

  return li;
}