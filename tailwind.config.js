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
        ink: '#030712',
        panel: 'rgba(17, 24, 39, 0.6)',
        cyanGlow: '#00d4ff',
        violetGlow: '#7c3aed',
        pinkGlow: '#f472b6',
        surface: 'rgba(17, 24, 39, 0.4)'
      },
      boxShadow: {
        neon: '0 0 40px rgba(0, 212, 255, 0.2)',
        card: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        glow: '0 0 60px rgba(0, 212, 255, 0.15)',
        'glow-lg': '0 0 80px rgba(0, 212, 255, 0.25)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, rgba(0, 212, 255, 0.2), transparent 60%)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'reveal': 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'gradient': 'gradient 8s ease infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        reveal: {
          '0%': { clipPath: 'inset(0 0 100% 0)', opacity: '0' },
          '100%': { clipPath: 'inset(0 0 0 0)', opacity: '1' }
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      }
    }
  },
  plugins: []
};