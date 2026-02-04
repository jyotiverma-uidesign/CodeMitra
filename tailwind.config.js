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
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      border: "hsl(var(--border))",
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
    },
  },
};

export const plugins = [
  function({ addUtilities }) {
    addUtilities({
      '.bg-gradient-radial': {
        'background-image': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
    });
  },
];
