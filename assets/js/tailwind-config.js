/* Ordinary Water — shared Tailwind config (Sacred Modernism design system)
   Loaded right after the Tailwind CDN script on every page. */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-secondary-fixed": "#25005a",
        "surface-container-low": "#191c1d",
        "surface-container-highest": "#323536",
        "surface-container-high": "#282a2b",
        "on-surface": "#e1e3e4",
        "secondary-fixed": "#eaddff",
        "on-error-container": "#ffdad6",
        "on-primary": "#293041",
        "primary-fixed-dim": "#bfc6dc",
        "on-tertiary-fixed": "#211b00",
        "surface-dim": "#111415",
        "inverse-on-surface": "#2e3132",
        "primary-container": "#101828",
        "secondary-container": "#6001d1",
        "tertiary-fixed-dim": "#e2c62d",
        "on-tertiary": "#393000",
        "inverse-surface": "#e1e3e4",
        "on-secondary-fixed-variant": "#5a00c6",
        "on-tertiary-container": "#4a3f00",
        "error-container": "#93000a",
        "outline-variant": "#45474c",
        "secondary": "#d2bbff",
        "on-primary-fixed": "#141b2c",
        "outline": "#8f9097",
        "surface-bright": "#373a3b",
        "primary": "#bfc6dc",
        "surface-variant": "#323536",
        "on-secondary": "#3f008e",
        "on-surface-variant": "#c6c6cd",
        "inverse-primary": "#565e71",
        "on-primary-fixed-variant": "#3f4759",
        "secondary-fixed-dim": "#d2bbff",
        "tertiary-container": "#c4aa00",
        "on-tertiary-fixed-variant": "#524600",
        "background": "#111415",
        "surface-container": "#1d2021",
        "primary-fixed": "#dbe2f9",
        "surface-tint": "#bfc6dc",
        "surface": "#111415",
        "error": "#ffb4ab",
        "tertiary-fixed": "#ffe24c",
        "on-background": "#e1e3e4",
        "on-secondary-container": "#c9aeff",
        "surface-container-lowest": "#0c0f10",
        "on-primary-container": "#798195",
        "on-error": "#690005",
        "tertiary": "#e2c62d"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "9999px"
      },
      spacing: {
        "stack-sm": "12px",
        "stack-xl": "80px",
        "container-padding-mobile": "20px",
        "base": "8px",
        "container-padding-desktop": "64px",
        "gutter": "16px",
        "stack-md": "24px",
        "stack-lg": "48px"
      },
      fontFamily: {
        "label-caps": ["Hanken Grotesk", "sans-serif"],
        "display-lg-mobile": ["Libre Caslon Text", "serif"],
        "headline-md": ["Libre Caslon Text", "serif"],
        "headline-sm": ["Libre Caslon Text", "serif"],
        "display-lg": ["Libre Caslon Text", "serif"],
        "body-md": ["Hanken Grotesk", "sans-serif"],
        "body-lg": ["Hanken Grotesk", "sans-serif"]
      },
      fontSize: {
        "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.1em", fontWeight: "700" }],
        "display-lg-mobile": ["36px", { lineHeight: "42px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-md": ["32px", { lineHeight: "40px", fontWeight: "600" }],
        "headline-sm": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }]
      }
    }
  }
};
