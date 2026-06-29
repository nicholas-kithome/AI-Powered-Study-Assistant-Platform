import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#E6FAF5",
          100: "#CCF2EA",
          200: "#99E0D0",
          300: "#66CCB3",
          400: "#33B796",
          500: "#10a37f",
          600: "#0A8F6A",
          700: "#007754",
          800: "#00553B",
          900: "#003322",
        },
        accent: {
          50:  "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        surface: {
          50:  "#FFFFFF",
          100: "#FFFFFF",
          200: "#ECECEC",
          300: "#B4B4B4",
          400: "#8E8E8E",
          500: "#676767",
          600: "#424242",
          700: "#2F2F2F",
          800: "#212121",
          900: "#111111",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "card":  "12px",
        "panel": "16px",
      },
      boxShadow: {
        "card":         "0 0 0 1px rgba(255,255,255,0.05), 0 2px 4px rgba(0,0,0,0.2)",
        "card-hover":   "0 0 0 1px rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)",
        "panel":        "0 0 0 1px rgba(255,255,255,0.05), 0 8px 24px rgba(0,0,0,0.4)",
        "glow-primary": "0 0 0 3px rgba(16, 163, 127, 0.15), 0 4px 20px rgba(16, 163, 127, 0.2)",
        "glow-accent":  "0 0 0 3px rgba(139, 92, 246, 0.15), 0 4px 20px rgba(139, 92, 246, 0.2)",
        "glow-red":     "0 0 0 3px rgba(239, 68, 68, 0.15), 0 4px 20px rgba(239, 68, 68, 0.15)",
        "glow-amber":   "0 0 0 3px rgba(245, 158, 11, 0.15), 0 4px 20px rgba(245, 158, 11, 0.15)",
        "inner-glow":   "inset 0 1px 0 0 rgba(255,255,255,0.05)",
      },
      animation: {
        "fade-in":       "fadeIn 0.3s ease-out both",
        "slide-up":      "slideUp 0.35s ease-out both",
        "slide-down":    "slideDown 0.3s ease-out both",
        "slide-in-right":"slideInRight 0.3s ease-out both",
        "scale-in":      "scaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "bounce-in":     "bounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "float":         "float 3s ease-in-out infinite",
        "pulse-glow":    "pulseGlow 2.5s ease-in-out infinite",
        "glow-ring":     "glowRing 2s ease-in-out infinite",
        "shimmer":       "shimmer 1.6s ease-in-out infinite",
        "spin-slow":     "spin 3s linear infinite",
        "spin":          "spin 0.7s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%":   { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%":   { opacity: "0", transform: "translateX(14px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%":   { opacity: "0", transform: "scale(0.93)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        bounceIn: {
          "0%":   { opacity: "0", transform: "scale(0.8)" },
          "60%":  { transform: "scale(1.05)" },
          "80%":  { transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-5px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(20, 184, 166, 0.25)" },
          "50%":      { boxShadow: "0 0 0 8px rgba(20, 184, 166, 0)" },
        },
        glowRing: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(37, 99, 235, 0.3)" },
          "50%":      { boxShadow: "0 0 0 6px rgba(37, 99, 235, 0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      animationDelay: {
        "75":  "75ms",
        "100": "100ms",
        "150": "150ms",
        "200": "200ms",
        "300": "300ms",
        "500": "500ms",
      },
    },
  },
  plugins: [],
};

export default config;
