import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "769px",  // 태블릿 브레이크포인트 (769px ~ 1024px)
      lg: "1025px", // 데스크톱 브레이크포인트 (1025px ~)
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        background: "#0F1015",
        card: {
          DEFAULT: "#191A23",
          foreground: "#F3F4F6",
        },
        primary: {
          DEFAULT: "#6366F1",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#262833",
          foreground: "#E5E7EB",
        },
        accent: {
          DEFAULT: "#F59E0B",
          foreground: "#0F1015",
        },
        muted: {
          DEFAULT: "#262833",
          foreground: "#9CA3AF",
        },
        border: "#2B2D3A",
        foreground: "#F3F4F6",
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        heading: ["Plus Jakarta Sans", "Pretendard", "sans-serif"],
        body: ["Inter", "Pretendard", "Noto Sans KR", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
        btn: "8px",
      },
    },
  },
  plugins: [],
};

export default config;

