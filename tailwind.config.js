/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "#000000", // Pure black
          secondary: "#0A0A0A", // Slightly lighter black
          tertiary: "#111111"  // Even lighter black for layering
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        cyber: {
          900: "#1a1a1a",
          800: "#2d2d2d",
          700: "#414141",
          600: "#545454",
          500: "#676767",
          400: "#8f8f8f",
          300: "#b7b7b7",
          200: "#dfdfdf",
          100: "#ffffff",
        },
        text: {
          primary: "#FFFFFF",    // White
          secondary: "#CCCCCC",  // Light gray
          muted: "#999999"      // Darker gray
        },
        // Border colors
        border: {
          DEFAULT: "#8f8f8f",   // cyber-400
          light: "#b7b7b7",     // cyber-300
          hover: "#ffffff"      // cyber-100
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#8f8f8f",   // cyber-400
          hover: "#b7b7b7",     // cyber-300
          active: "#ffffff"     // cyber-100
        },
        boxShadow: {
          'cyber': '0 0 10px rgba(143, 143, 143, 0.3)',
          'cyber-lg': '0 0 20px rgba(143, 143, 143, 0.4)',
          'cyber-xl': '0 0 30px rgba(143, 143, 143, 0.5)',
        },
        // Add gradient backgrounds
        backgroundImage: {
          'cyber-gradient': 'linear-gradient(to bottom right, #1a1a1a, #000000)',
          'cyber-glow': 'radial-gradient(circle at center, rgba(143, 143, 143, 0.15), transparent 70%)',
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          background: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          border: "hsl(var(--sidebar-border))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
        },
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'poppins': ['Poppins', 'sans-serif'],
        'nunito': ['Nunito Sans', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shake: {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-2px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(2px, 0, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shake": "shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both",
        "spin-slower": "spin 3s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 