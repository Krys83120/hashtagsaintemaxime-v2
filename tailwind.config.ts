import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CHARTE GRAPHIQUE #SAINTEMAXIME
        sm: {
          turquoise: "#00D4FF",      // Bleu turquoise principal (SAINTE MAXIME)
          turquoiseDark: "#00B8E0",  // Turquoise foncé hover
          turquoiseLight: "#4DE3FF", // Turquoise clair accents
          white: "#FFFFFF",           // # blanc
          black: "#1A1A1A",           // # contour noir / texte
          red: "#E63946",             // Cœur lifestyle
          redDark: "#C62828",         // Rouge foncé hover
          cream: "#F8F6F0",           // Fond crème
          sand: "#D4A574",            // Or sable (accents secondaires)
          deep: "#1A1A1A",            // Texte principal
          gray: "#6B7280",            // Texte secondaire
        },
        // Legacy aliases pour compatibilité
        mediterranean: {
          DEFAULT: "#00D4FF",
          dark: "#00B8E0",
          light: "#4DE3FF",
        },
        sand: {
          DEFAULT: "#D4A574",
          dark: "#B8854A",
          light: "#E8C9A0",
        },
        cream: {
          DEFAULT: "#F8F6F0",
          dark: "#E8E4DA",
        },
        deep: {
          DEFAULT: "#1A1A1A",
          light: "#333333",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        script: ["var(--font-dancing)", "cursive"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 3s ease-in-out infinite",
        "heart-beat": "heartBeat 1.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        heartBeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.1)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.1)" },
          "70%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;