// Mobile Detection Function (similar to is-mobile package)
const isMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  // Check for mobile devices
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  const isMobileDevice = mobileRegex.test(userAgent);
  
  // Check for touch capability
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Check screen size (mobile typically < 768px)
  const isSmallScreen = window.innerWidth < 768;
  
  return isMobileDevice || (isTouchDevice && isSmallScreen);
};

// Dashboard Navigation JavaScript
const navigateDashboard = (page, element) => {
  changeNavSelector(element);

  let iframe = document.getElementById("embedded-dashboard");
  let iframeWindow = iframe.contentWindow || iframe.contentDocument;

  // Send both page and mobile information to the iframe
  iframeWindow.postMessage({ 
    page: page,
    mobile: isMobile(),
    userAgent: navigator.userAgent,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight
  }, "*");
};

const changeNavSelector = (element) => {
  var navItems = document.getElementsByClassName("selected-nav");
  for (var i = 0; i < navItems.length; i++) {
    navItems.item(i).classList.remove("selected-nav");
  }
  
  element.classList.add("selected-nav");
}

// Initialize mobile detection and send to iframe
const initializeMobileDetection = () => {
  const iframe = document.getElementById("embedded-dashboard");
  
  // Wait for iframe to load before sending message
  iframe.onload = function() {
    const iframeWindow = iframe.contentWindow || iframe.contentDocument;
    
    // Send initial mobile detection to iframe
    iframeWindow.postMessage({ 
      page: 'dashboard',
      mobile: isMobile(),
      userAgent: navigator.userAgent,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      initialized: true
    }, "*");
    
    console.log('Mobile detection sent to iframe:', {
      mobile: isMobile(),
      userAgent: navigator.userAgent,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    });
  };
};

// Mobile-specific enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile detection
    initializeMobileDetection();
    
    // Add haptic feedback for mobile devices
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
    });
    
    // Touch gesture support for mobile
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        handleSwipe();
    });
    
    function handleSwipe() {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Only handle horizontal swipes
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            const currentActiveNav = document.querySelector('.selected-nav');
            const currentNavIndex = Array.from(navItems).indexOf(currentActiveNav);
            
            if (deltaX > 0 && currentNavIndex > 0) {
                // Swipe right - go to previous tab
                navItems[currentNavIndex - 1].click();
            } else if (deltaX < 0 && currentNavIndex < navItems.length - 1) {
                // Swipe left - go to next tab
                navItems[currentNavIndex + 1].click();
            }
        }
    }
    
    // Add smooth scrolling for better mobile experience
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Prevent zoom on double tap for better mobile experience
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        const currentActiveNav = document.querySelector('.selected-nav');
        const currentNavIndex = Array.from(navItems).indexOf(currentActiveNav);
        
        if (e.key === 'ArrowLeft' && currentNavIndex > 0) {
            navItems[currentNavIndex - 1].click();
        } else if (e.key === 'ArrowRight' && currentNavIndex < navItems.length - 1) {
            navItems[currentNavIndex + 1].click();
        }
    });
    
    // Handle window resize to update mobile detection
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const iframe = document.getElementById("embedded-dashboard");
            const iframeWindow = iframe.contentWindow || iframe.contentDocument;
            
            // Send updated mobile detection on resize
            iframeWindow.postMessage({ 
                page: 'dashboard',
                mobile: isMobile(),
                userAgent: navigator.userAgent,
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
                resized: true
            }, "*");
        }, 250); // Debounce resize events
    });
    
    // Initialize the app
    console.log('Dashboard navigation initialized successfully!');
    console.log('Mobile detection:', isMobile());
    console.log('Screen size:', window.innerWidth + 'x' + window.innerHeight);
    console.log('User agent:', navigator.userAgent);
    console.log('Available navigation:');
    console.log('- Home: navigateDashboard("dashboard", element)');
    console.log('- Calendar: navigateDashboard("calendar", element)');
    console.log('- Social Inbox: navigateDashboard("inbox", element)');
});