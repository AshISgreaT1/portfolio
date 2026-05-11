/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Sora"', 'sans-serif']
      },
      colors: {
        ink: '#050816',
        panel: 'rgba(13, 18, 38, 0.68)',
        cyanGlow: '#4fdcff',
        violetGlow: '#8b5cf6'
      },
      boxShadow: {
        neon: '0 0 40px rgba(79, 220, 255, 0.18)',
        card: '0 24px 80px rgba(0, 0, 0, 0.32)'
      },
      backgroundImage: {
        'radial-grid': 'radial-gradient(circle at 50% 0%, rgba(79, 220, 255, 0.16), transparent 32%), radial-gradient(circle at 90% 20%, rgba(139, 92, 246, 0.18), transparent 28%)'
      }
    }
  },
  plugins: []
};
