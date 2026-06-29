export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        amber: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          dim: 'rgba(245,158,11,0.1)',
        },
      },
    },
  },
  plugins: [],
}