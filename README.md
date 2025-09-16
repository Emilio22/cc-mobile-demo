# Mobile Website with Dashboard Integration

A mobile-friendly website with three navigation tabs that integrates with an embedded dashboard iframe.

## Features

- 🏠 **Home Tab** - Dashboard view
- 📅 **Calendar Tab** - Calendar view  
- 💬 **Social Inbox Tab** - Social inbox view
- 📱 **Mobile Optimized** - Responsive design with mobile detection
- 🎯 **Touch Gestures** - Swipe navigation support
- 🌙 **Dark Mode** - Automatic dark mode support
- 📡 **PostMessage Integration** - Communicates with embedded dashboard

## Mobile Detection

The website automatically detects mobile devices and sends mobile optimization flags to the embedded dashboard iframe. This includes:

- User agent detection
- Touch capability detection  
- Screen size detection
- Real-time mobile status updates

## Navigation

Each tab sends specific page parameters to the iframe:

- **Home**: `{ page: 'dashboard', mobile: true/false }`
- **Calendar**: `{ page: 'calendar', mobile: true/false }`
- **Social Inbox**: `{ page: 'inbox', mobile: true/false }`

## Files

- `index.html` - Main HTML structure
- `styles.css` - Mobile-responsive CSS styling
- `script.js` - Navigation and mobile detection logic

## Usage

1. Open `index.html` in a web browser
2. The embedded dashboard loads automatically
3. Navigate between tabs using the bottom navigation
4. Mobile detection automatically optimizes the iframe content

## Mobile Features

- Haptic feedback on mobile devices
- Swipe gestures for navigation
- Responsive design for all screen sizes
- Proper spacing to prevent navigation bar overlap
- Touch-optimized interface

## Browser Support

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)
- Desktop browsers (Chrome, Firefox, Safari, Edge)

## Development

The project uses vanilla HTML, CSS, and JavaScript with no external dependencies for maximum compatibility and performance.
