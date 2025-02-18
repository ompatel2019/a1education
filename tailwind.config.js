/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		colors: {
		  primary: "var(--primary)",       
		  "primary-hover": "var(--primary-hover)",
  
		  black: "#2A2A2A",
		  white: "#FFFFFF",
		  grey: "#B0B0B0",
  
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
  
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
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
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  chart: {
			"1": "hsl(var(--chart-1))",
			"2": "hsl(var(--chart-2))",
			"3": "hsl(var(--chart-3))",
			"4": "hsl(var(--chart-4))",
			"5": "hsl(var(--chart-5))",
		  },
		},
  
		// 2) Custom gradient that overrides "bg-gradient-to-b"
		backgroundImage: {
		  "gradient-to-b": "linear-gradient(to bottom, #4A6CF7 0%, #5296E3 50%, #7A8BD1 100%)",
		},
  
		// 3) Fonts
		fontFamily: {
		  "generalSans-light": ["GeneralSans-Light", "sans-serif"],
		  "generalSans-light-italic": ["GeneralSans-LightItalic", "sans-serif"],
		  "generalSans": ["GeneralSans-Regular", "sans-serif"],
		  "generalSans-italic": ["GeneralSans-Italic", "sans-serif"],
		  "generalSans-medium": ["GeneralSans-Medium", "sans-serif"],
		  "generalSans-medium-italic": ["GeneralSans-MediumItalic", "sans-serif"],
		  "generalSans-semibold": ["GeneralSans-Semibold", "sans-serif"],
		  "generalSans-semibold-italic": ["GeneralSans-SemiboldItalic", "sans-serif"],
		  "generalSans-bold": ["GeneralSans-Bold", "sans-serif"],
		  "generalSans-bold-italic": ["GeneralSans-BoldItalic", "sans-serif"],
		  "generalSans-variable": ["GeneralSans-Variable", "sans-serif"],
		  "generalSans-variable-italic": ["GeneralSans-VariableItalic", "sans-serif"],
		},
  
		// 4) Marquee animations (for MagicUI marquee)
		keyframes: {
		  marquee: {
			from: { transform: "translateX(0)" },
			to: { transform: "translateX(calc(-100% - var(--gap)))" },
		  },
		  "marquee-vertical": {
			from: { transform: "translateY(0)" },
			to: { transform: "translateY(calc(-100% - var(--gap)))" },
		  },
		},
		animation: {
		  marquee: "marquee var(--duration) infinite linear",
		  "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  };
  