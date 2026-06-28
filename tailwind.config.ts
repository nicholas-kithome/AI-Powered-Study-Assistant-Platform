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
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        accent: {
          50:  "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        surface: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
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
        "card":         "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        "card-hover":   "0 8px 20px -4px rgb(0 0 0 / 0.12), 0 4px 8px -4px rgb(0 0 0 / 0.08)",
        "panel":        "0 10px 25px -5px rgb(0 0 0 / 0.1), 0 4px 10px -5px rgb(0 0 0 / 0.06)",
        "glow-primary": "0 0 0 3px rgba(37, 99, 235, 0.15), 0 4px 20px rgba(37, 99, 235, 0.2)",
        "glow-accent":  "0 0 0 3px rgba(20, 184, 166, 0.15), 0 4px 20px rgba(20, 184, 166, 0.2)",
        "glow-red":     "0 0 0 3px rgba(239, 68, 68, 0.15), 0 4px 20px rgba(239, 68, 68, 0.15)",
        "glow-amber":   "0 0 0 3px rgba(245, 158, 11, 0.15), 0 4px 20px rgba(245, 158, 11, 0.15)",
        "inner-glow":   "inset 0 1px 0 0 rgba(255,255,255,0.5)",
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
