/**
 * Color palette extracted/approximated from the provided 1Fi app screenshots.
 * Primary purple, soft lavender surfaces, near-black text, muted gray secondary text.
 */
export const colors = {
  // Brand
  primary: '#6C38E0',
  primaryDark: '#4B21B8',
  primaryLight: '#EDE4FB',
  primaryGradientStart: '#3D1F8C',
  primaryGradientEnd: '#7A3FE8',

  // Accent (used sparingly, e.g. "upto ₹1000" highlight, discounts)
  accent: '#F5A623',
  success: '#1FA35C',
  danger: '#E3543D',

  // Surfaces
  background: '#F5F4F8',
  surface: '#FFFFFF',
  surfaceAlt: '#F1EEFA',

  // Text
  textPrimary: '#1C1B24',
  textSecondary: '#6B6976',
  textMuted: '#9C99A8',
  textOnPrimary: '#FFFFFF',

  // Borders / dividers
  border: '#E7E5EF',
  divider: '#EFEDF5',

  // States
  selectedBorder: '#6C38E0',
  unselectedBorder: '#DCDAE5',
  disabled: '#C9C6D4',
};

export type AppColors = typeof colors;
