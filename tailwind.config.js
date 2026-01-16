/** @type {import('tailwindcss').Config} */

// ✅ Only dark mode added, rest untouched
export const darkMode = "class";

export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];

export const theme = {
  extend: {
    colors: {
      background: "#1a1b1f",        // body background
      foreground: "#f8f8f2",        // text color
      border: "#2c2d31",            // borders
      card: "#2a2b30",              // glass panels
      primary: "#8b5cf6",           // gradient primary
      muted: "#3a3b42",             // muted backgrounds
      "muted-foreground": "#9ca3af",
      accent: "#facc15",            // optional accent
    },
  },
};

export const plugins = [];
