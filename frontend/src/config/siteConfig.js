// Site Configuration
// Toggle features on/off easily

export const SITE_CONFIG = {
  // Set to false to disable the loading screen
  ENABLE_PRELOADER: true,
  
  // Preloader duration in milliseconds
  PRELOADER_DURATION: 5000,
  
  // Respect reduced motion preferences
  RESPECT_REDUCED_MOTION: true,
};

// Theme colors - Red/Magenta/Black palette
export const THEME_COLORS = {
  // Primary accent - bright magenta/crimson
  primary: '#E11D48',
  primaryLight: '#F43F5E',
  primaryDark: '#BE123C',
  
  // Secondary accent - softer pinkish-red
  secondary: '#EC4899',
  secondaryLight: '#F472B6',
  
  // Backgrounds
  bgDark: '#0A0A0F',
  bgCard: 'rgba(15, 10, 20, 0.8)',
  
  // Gradients
  gradientPrimary: 'linear-gradient(135deg, #E11D48, #EC4899)',
  gradientGlow: 'linear-gradient(135deg, rgba(225, 29, 72, 0.3), rgba(236, 72, 153, 0.2))',
};

export default SITE_CONFIG;
