/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0EA5E9",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#6366F1",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F3F4F6",
          foreground: "#6B7280",
        },
        accent: {
          DEFAULT: "#F8FAFC",
          foreground: "#0F172A",
        },
      },
      borderRadius: {
        lg: "0.625rem",
        xl: "0.875rem",
        "2xl": "1rem",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(-1deg)" },
          "50%": { transform: "translateY(-5px) rotate(1deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'border-shine': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'sparkle-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'particle': {
          '0%': {
            transform: 'translateY(0) scale(0)',
            opacity: 0,
          },
          '50%': {
            opacity: 1,
          },
          '100%': {
            transform: 'translateY(-20px) scale(1)',
            opacity: 0,
          },
        },
        'twinkle': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.3, transform: 'scale(0.8)' },
        },
        'magic-particle': {
          '0%': {
            transform: 'translateY(0) scale(0) rotate(0deg)',
            opacity: 0,
          },
          '50%': {
            opacity: 1,
          },
          '100%': {
            transform: 'translateY(-20px) scale(1.5) rotate(360deg)',
            opacity: 0,
          },
        },
        'bounce': {
          '0%, 100%': { 
            transform: 'translateY(-10%) rotate(-5deg)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0) rotate(5deg)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-in",
        "slide-in": "slide-in 0.3s ease-out",
        "slide-out": "slide-out 0.3s ease-in",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 8s ease-in-out infinite",
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'border-shine': 'border-shine 3s linear infinite',
        'sparkle-spin': 'sparkle-spin 3s linear infinite',
        'particle': 'particle 1s ease-in-out infinite',
        'twinkle': 'twinkle 1.5s ease-in-out infinite',
        'magic-particle': 'magic-particle 1.5s ease-out infinite',
        'bounce': 'bounce 1s ease-in-out infinite',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-shimmer": "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
      },
      boxShadow: {
        sketch: "4px 4px 0 rgba(0, 0, 0, 0.1)",
        glow: "0 0 20px rgba(14, 165, 233, 0.15)",
      },
    },
  },
} 