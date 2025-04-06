export function createForumItem({ title, author, replies, status }) {
    const li = document.createElement('li');
    li.className = 'forum-item';
  
    li.innerHTML = `
      <div class="forum-title">${title}</div>
      <div class="forum-meta">
          <span>by ${author}</span>
          <div class="forum-stats">
              <span>${replies} replies</span>
              <span>${status}</span>
          </div>
      </div>
    `;
  
    return li;
  }
  