/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/contexts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    primary: '#6366f1',
    secondary: '#D926AA',
    accent: '#1FB2A5',
    neutral: '#191D24',
    'base-100': '#2A303C',
    info: '#3ABFF8',
    success: '#36D399',
    warning: '#FBBD23',
    error: '#F87272',
    extend: {
      backgroundColor: {
        primary: '#0f172a',
        cilistia: '#6366f1',
        blue: 'rgb(59 130 246/var(--tw-bg-opacity))',
      },
      textColor: {
        primary: '#FFFFFF',
        cilistia: '#6366f1',
        blue: 'rgb(59 130 246/var(--tw-bg-opacity))',
      },
    },
  },
  plugins: [],
};
