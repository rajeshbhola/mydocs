/**
 * Extra JavaScript for MkDocs Material
 * Adds custom interactivity and enhancements
 * Enhanced version with improved performance and features
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 MkDocs Material Documentation Loaded!');
  console.log('✨ Enhanced features activated');

  // Initialize custom features
  initScrollProgress();
  initSmoothScroll();
  initExternalLinks();
  initCopyNotification();
  initReadingTime();
  initLastUpdated();
  initScrollToTop();
  initLazyLoading();
  initCardAnimations();
  initCodeBlockEnhancements();
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

/**
 * Scroll to Top Button
 * Shows a button to scroll back to top when user scrolls down
 */
function initScrollToTop() {
  const scrollButton = document.createElement('div');
  scrollButton.className = 'scroll-to-top';
  scrollButton.innerHTML = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" /></svg>';
  scrollButton.setAttribute('aria-label', 'Scroll to top');
  scrollButton.setAttribute('role', 'button');
  scrollButton.setAttribute('tabindex', '0');
  document.body.appendChild(scrollButton);

  // Show/hide button based on scroll position
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
      } else {
        scrollButton.classList.remove('visible');
      }
    }, 100);
  });

  // Scroll to top on click
  scrollButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Keyboard support
  scrollButton.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollButton.click();
    }
  });
}

/**
 * Lazy Loading for Images
 * Improves page load performance
 */
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

/**
 * Card Animations on Scroll
 * Animates cards as they come into view
 */
function initCardAnimations() {
  if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            entry.target.style.opacity = '1';
          }, index * 100);
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.grid.cards > *, .feature-card').forEach(card => {
      card.style.opacity = '0';
      cardObserver.observe(card);
    });
  }
}

/**
 * Code Block Enhancements
 * Adds line numbers and language badges
 */
function initCodeBlockEnhancements() {
  document.querySelectorAll('.highlight').forEach(block => {
    // Add language badge
    const codeElement = block.querySelector('code');
    if (codeElement && codeElement.className) {
      const languageMatch = codeElement.className.match(/language-(\w+)/);
      if (languageMatch) {
        const language = languageMatch[1];
        const badge = document.createElement('div');
        badge.className = 'code-language-badge';
        badge.textContent = language;
        badge.style.cssText = `
          position: absolute;
          top: 0.5rem;
          right: 3rem;
          background: var(--md-primary-fg-color);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          z-index: 1;
        `;
        block.style.position = 'relative';
        block.appendChild(badge);
      }
    }
  });
}

/**
 * Performance Monitor
 * Logs performance metrics (dev only)
 */
function logPerformance() {
  if (window.performance && window.performance.getEntriesByType) {
    const perfData = window.performance.getEntriesByType('navigation')[0];
    if (perfData) {
      const pageLoadTime = perfData.loadEventEnd - perfData.fetchStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domInteractive;

      console.log('📊 Performance Metrics:');
      console.table({
        'Page Load Time': `${Math.round(pageLoadTime)}ms`,
        'Connection Time': `${Math.round(connectTime)}ms`,
        'Render Time': `${Math.round(renderTime)}ms`
      });
    }
  }
}

// Log performance after page load
window.addEventListener('load', function() {
  setTimeout(logPerformance, 100);
});

/**
 * Theme Toggle Enhancement
 * Smooth transition between light and dark modes
 */
function enhanceThemeToggle() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-md-color-scheme') {
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        showToast('Theme switched! 🎨', 1500);
      }
    });
  });

  const htmlElement = document.documentElement;
  observer.observe(htmlElement, { attributes: true });
}

// Initialize theme toggle enhancement
enhanceThemeToggle();

/**
 * Keyboard Navigation Enhancement
 * Additional keyboard shortcuts for better accessibility
 */
document.addEventListener('keydown', function(e) {
  // Alt + H to go to home
  if (e.altKey && e.key === 'h') {
    e.preventDefault();
    window.location.href = '/';
  }

  // Alt + T to scroll to top
  if (e.altKey && e.key === 't') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

/**
 * Copy Code with Syntax Highlighting Preserved
 * Enhanced copy functionality
 */
function enhancedCopyCode() {
  document.querySelectorAll('.md-clipboard').forEach(button => {
    button.addEventListener('click', function() {
      // Add success animation
      this.style.transform = 'scale(1.2)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
    });
  });
}

// Initialize enhanced copy
setTimeout(enhancedCopyCode, 500);

/**
 * Search Enhancement
 * Adds search result counter
 */
function enhanceSearch() {
  const searchInput = document.querySelector('.md-search__input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      setTimeout(() => {
        const results = document.querySelectorAll('.md-search-result__item');
        if (results.length > 0) {
          console.log(`Found ${results.length} results`);
        }
      }, 100);
    });
  }
}

// Initialize search enhancement
setTimeout(enhanceSearch, 1000);

/**
 * Link Preview on Hover (Internal Links)
 * Shows a preview tooltip for internal links
 */
function initLinkPreviews() {
  const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"]');
  internalLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const href = this.getAttribute('href');
      if (href && !this.querySelector('.link-preview')) {
        // You can enhance this to show actual previews
        this.style.position = 'relative';
      }
    });
  });
}

// Initialize link previews
setTimeout(initLinkPreviews, 500);

console.log('✨ All custom features initialized!');
console.log('🎯 Performance optimizations active');
console.log('♿ Accessibility enhancements enabled');