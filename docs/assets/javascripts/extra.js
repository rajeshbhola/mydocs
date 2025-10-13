/**
 * Extra JavaScript for MkDocs Material
 * Adds custom interactivity and enhancements
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 MkDocs Material Documentation Loaded!');
  
  // Initialize custom features
  initScrollProgress();
  initSmoothScroll();
  initExternalLinks();
  initCopyNotification();
  initReadingTime();
  initLastUpdated();
});

/**
 * Reading Progress Bar
 * Shows scroll progress below the header at the top of the page
 */
function initScrollProgress() {
  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.id = 'reading-progress-bar';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    width: 0%;
    z-index: 1000;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);

  // Update progress bar on scroll
  window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

/**
 * Smooth Scrolling for Anchor Links
 * Enhances navigation within the page
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Update URL without jumping
        history.pushState(null, null, href);
      }
    });
  });
}

/**
 * External Links Enhancement
 * Adds icon and opens in new tab
 */
function initExternalLinks() {
  const links = document.querySelectorAll('.md-content a[href^="http"]');
  links.forEach(link => {
    // Don't modify if it's an internal link
    if (link.hostname === window.location.hostname) return;
    
    // Add external link indicator
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    
    // Add icon if not already present
    if (!link.querySelector('.external-link-icon')) {
      const icon = document.createElement('span');
      icon.className = 'external-link-icon';
      icon.innerHTML = ' <svg style="width:0.8em;height:0.8em;display:inline-block;margin-left:0.2em;vertical-align:middle;" viewBox="0 0 24 24"><path fill="currentColor" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" /></svg>';
      link.appendChild(icon);
    }
  });
}

/**
 * Copy Code Notification
 * Shows a toast notification when code is copied
 */
function initCopyNotification() {
  // Listen for code copy events
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('md-clipboard') || 
        e.target.closest('.md-clipboard')) {
      showToast('Code copied to clipboard! ✓');
    }
  });
}

/**
 * Show Toast Notification
 * @param {string} message - Message to display
 */
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'custom-toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: #10b981;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    animation: slideInUp 0.3s ease, fadeOut 0.3s ease 2.7s;
    font-weight: 500;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/**
 * Calculate and Display Reading Time
 * Estimates reading time based on word count
 */
function initReadingTime() {
  const content = document.querySelector('.md-content__inner');
  if (!content) return;
  
  const text = content.textContent;
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/min
  
  // Add reading time to the page
  const title = document.querySelector('.md-content h1');
  if (title && readingTime > 1) {
    const timeInfo = document.createElement('div');
    timeInfo.className = 'reading-time';
    timeInfo.innerHTML = `
      <span style="color: var(--md-default-fg-color--light); font-size: 0.9em;">
        <svg style="width:1em;height:1em;display:inline-block;margin-right:0.3em;vertical-align:middle;" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
        </svg>
        ${readingTime} min read · ${wordCount.toLocaleString()} words
      </span>
    `;
    title.appendChild(timeInfo);
  }
}

/**
 * Last Updated Information
 * Shows when the page was last modified
 */
function initLastUpdated() {
  const footer = document.querySelector('.md-footer-meta');
  if (!footer) return;
  
  const lastModified = document.lastModified;
  if (lastModified) {
    const updateInfo = document.createElement('div');
    updateInfo.style.cssText = `
      text-align: center;
      padding: 0.5rem;
      opacity: 0.7;
      font-size: 0.85em;
    `;
    updateInfo.innerHTML = `Last updated: ${new Date(lastModified).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}`;
    footer.appendChild(updateInfo);
  }
}

/**
 * Keyboard Shortcuts Enhancement
 * Add custom keyboard shortcuts
 */
document.addEventListener('keydown', function(e) {
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchButton = document.querySelector('[data-md-component="search-button"]');
    if (searchButton) searchButton.click();
  }
  
  // Escape to close search
  if (e.key === 'Escape') {
    const searchQuery = document.querySelector('.md-search__input');
    if (searchQuery && document.activeElement === searchQuery) {
      searchQuery.blur();
    }
  }
});

/**
 * Table of Contents Highlight
 * Highlights current section in TOC
 */
function initTOCHighlight() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const tocLink = document.querySelector(`.md-nav__link[href="#${id}"]`);
      
      if (entry.intersectionRatio > 0) {
        tocLink?.classList.add('md-nav__link--active');
      } else {
        tocLink?.classList.remove('md-nav__link--active');
      }
    });
  }, { threshold: 0.5 });
  
  // Observe all headers
  document.querySelectorAll('h2[id], h3[id]').forEach((section) => {
    observer.observe(section);
  });
}

// Initialize TOC highlighting
setTimeout(initTOCHighlight, 500);

/**
 * Add animations to elements
 */
function addScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out';
      }
    });
  }, { threshold: 0.1 });
  
  // Observe content blocks
  document.querySelectorAll('.md-typeset > *').forEach((el) => {
    observer.observe(el);
  });
}

// Initialize scroll animations
setTimeout(addScrollAnimations, 300);

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

console.log('✨ All custom features initialized!');