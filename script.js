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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile detection
    initializeMobileDetection();
    
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
});
