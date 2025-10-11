// Lesson Navigation Helper Functions
// These functions generate progress bars and navigation buttons automatically
// based on lesson-config.js

/**
 * Get current lesson info
 * @param {string} currentLessonId - The ID of the current lesson
 * @returns {object} - { index, total, current, next, prev, isFirst, isLast }
 */
function getLessonInfo(currentLessonId) {
  const lessons = LESSON_CONFIG.lessons;
  const index = lessons.findIndex(l => l.id === currentLessonId);
  
  if (index === -1) {
    console.error(`Lesson "${currentLessonId}" not found in config!`);
    return null;
  }
  
  return {
    index: index,
    total: lessons.length,
    current: lessons[index],
    next: index < lessons.length - 1 ? lessons[index + 1] : null,
    prev: index > 0 ? lessons[index - 1] : null,
    isFirst: index === 0,
    isLast: index === lessons.length - 1
  };
}

/**
 * Render progress bar HTML
 * @param {string} currentLessonId - The ID of the current lesson
 * @returns {string} - HTML string for progress bar
 */
function renderProgressBar(currentLessonId) {
  const info = getLessonInfo(currentLessonId);
  if (!info) return '';
  
  const completed = info.index;
  const total = info.total;
  const percentage = ((info.index + 1) / total) * 100;
  
  // Build dots
  let dots = '';
  for (let i = 0; i < total; i++) {
    if (i < info.index) {
      // Completed
      dots += '<div class="progress-dot completed">✓</div>';
    } else if (i === info.index) {
      // Current
      dots += '<div class="progress-dot current"></div>';
    } else {
      // Not started
      dots += '<div class="progress-dot"></div>';
    }
  }
  
  return `
    <div class="lesson-progress-container">
      <div class="lesson-progress-header">
        <span class="progress-text">Skref ${info.index + 1} af ${total}</span>
        <span class="progress-percentage">${Math.round(percentage)}%</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: ${percentage}%"></div>
      </div>
      <div class="progress-dots">
        ${dots}
      </div>
      <div class="progress-lessons">
        ${LESSON_CONFIG.lessons.map((lesson, i) => {
          let className = 'progress-lesson-name';
          if (i < info.index) className += ' completed';
          if (i === info.index) className += ' current';
          return `<span class="${className}">${lesson.icon} ${lesson.name}</span>`;
        }).join('<span class="progress-arrow">→</span>')}
      </div>
    </div>
  `;
}

/**
 * Render navigation buttons HTML
 * @param {string} currentLessonId - The ID of the current lesson
 * @param {string} position - 'top' or 'bottom'
 * @returns {string} - HTML string for navigation buttons
 */
function renderNavigationButtons(currentLessonId, position = 'bottom') {
  const info = getLessonInfo(currentLessonId);
  if (!info) return '';
  
  let html = '<div class="lesson-navigation">';
  
  // Previous button
  if (info.prev) {
    html += `
      <a href="${info.prev.url}" class="nav-button nav-prev">
        ← ${info.prev.name}
      </a>
    `;
  } else {
    html += `
      <a href="byrjun.html" class="nav-button nav-prev">
        ← Til baka
      </a>
    `;
  }
  
  // Next button
  if (info.next) {
    html += `
      <a href="${info.next.url}" class="nav-button nav-next">
        ${info.next.name} →
      </a>
    `;
  } else {
    html += `
      <a href="byrjun.html" class="nav-button nav-next nav-complete">
        🎉 Klárað!
      </a>
    `;
  }
  
  html += '</div>';
  
  return html;
}

/**
 * Initialize lesson navigation on a page
 * Call this function with your lesson ID to set up everything
 * @param {string} currentLessonId - The ID of the current lesson
 */
function initLessonNavigation(currentLessonId) {
  // Inject CSS if not already present
  if (!document.getElementById('lesson-navigation-styles')) {
    const style = document.createElement('style');
    style.id = 'lesson-navigation-styles';
    style.textContent = `
      /* Progress Bar Styles */
      .lesson-progress-container {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        border: 1px solid #e8e6e1;
      }
      
      .lesson-progress-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }
      
      .progress-text {
        font-size: 0.95rem;
        color: #6b6b6b;
        font-weight: 300;
      }
      
      .progress-percentage {
        font-size: 1.2rem;
        color: #1565c0;
        font-weight: 500;
      }
      
      .progress-bar-bg {
        width: 100%;
        height: 8px;
        background: #e0e0e0;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 1rem;
      }
      
      .progress-bar-fill {
        height: 100%;
        background: linear-gradient(90deg, #1565c0 0%, #42a5f5 100%);
        transition: width 0.5s ease;
        border-radius: 4px;
      }
      
      .progress-dots {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        gap: 0.5rem;
      }
      
      .progress-dot {
        flex: 1;
        height: 12px;
        background: #e0e0e0;
        border-radius: 6px;
        transition: all 0.3s ease;
      }
      
      .progress-dot.completed {
        background: #4caf50;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.7rem;
        font-weight: bold;
      }
      
      .progress-dot.current {
        background: #1565c0;
        transform: scale(1.2);
      }
      
      .progress-lessons {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        align-items: center;
        font-size: 0.85rem;
        color: #999;
      }
      
      .progress-lesson-name {
        white-space: nowrap;
        transition: all 0.2s;
      }
      
      .progress-lesson-name.completed {
        color: #4caf50;
        font-weight: 500;
      }
      
      .progress-lesson-name.current {
        color: #1565c0;
        font-weight: 600;
      }
      
      .progress-arrow {
        color: #ccc;
      }
      
      /* Navigation Buttons */
      .lesson-navigation {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 2rem;
      }
      
      .nav-button {
        flex: 1;
        padding: 1rem 2rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 400;
        font-size: 1rem;
        transition: all 0.3s ease;
        text-align: center;
        border: 2px solid transparent;
      }
      
      .nav-prev {
        background: white;
        color: #6b6b6b;
        border-color: #e8e6e1;
      }
      
      .nav-prev:hover {
        border-color: #1565c0;
        color: #1565c0;
        transform: translateX(-4px);
      }
      
      .nav-next {
        background: #1a1a1a;
        color: white;
      }
      
      .nav-next:hover {
        background: #333;
        transform: translateX(4px);
      }
      
      .nav-complete {
        background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
      }
      
      .nav-complete:hover {
        background: linear-gradient(135deg, #66bb6a 0%, #81c784 100%);
      }
      
      /* Responsive */
      @media (max-width: 768px) {
        .progress-lessons {
          display: none;
        }
        
        .lesson-navigation {
          flex-direction: column;
        }
        
        .nav-button {
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Render progress bar at top
  const progressHtml = renderProgressBar(currentLessonId);
  
  // Render navigation buttons (top and bottom)
  const navHtml = renderNavigationButtons(currentLessonId);
  
  return { progressHtml, navHtml };
}
