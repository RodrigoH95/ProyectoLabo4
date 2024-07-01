/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      colors: {
        // light mode
        tremor: {
          brand: {
            faint: "#e0f7fa", // cyan-50
            muted: "#80deea", // cyan-200
            subtle: "#26c6da", // cyan-400
            DEFAULT: "#00acc1", // cyan-500
            emphasis: "#00838f", // cyan-700
            inverted: "#ffffff", // white
          },
          background: {
            muted: "#f1f8e9", // light green-50
            subtle: "#dcedc8", // light green-100
            DEFAULT: "#ffffff", // white
            emphasis: "#2e7d32", // green-700
          },
          border: {
            DEFAULT: "#c8e6c9", // green-200
          },
          ring: {
            DEFAULT: "#c8e6c9", // green-200
          },
          content: {
            subtle: "#757575", // gray-600
            DEFAULT: "#616161", // gray-700
            emphasis: "#212121", // gray-900
            strong: "#000000", // black
            inverted: "#ffffff", // white
          },
        },
        // dark mode
        "dark-tremor": {
          brand: {
            faint: "#004d40", // teal-900
            muted: "#00695c", // teal-800
            subtle: "#00796b", // teal-700
            DEFAULT: "#00acc1", // cyan-500
            emphasis: "#26c6da", // cyan-400
            inverted: "#ffffff", // white
          },
          background: {
            muted: "#004d40", // teal-900
            subtle: "#004d40", // teal-800
            DEFAULT: "#263238", // blue gray-900
            emphasis: "#80cbc4", // teal-200
          },
          border: {
            DEFAULT: "#004d40", // teal-800
          },
          ring: {
            DEFAULT: "#004d40", // teal-800
          },
          content: {
            subtle: "#b0bec5", // blue gray-400
            DEFAULT: "#90a4ae", // blue gray-500
            emphasis: "#eceff1", // blue gray-100
            strong: "#ffffff", // white
            inverted: "#000000", // black
          },
        },
      },      
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem"],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  // eslint-disable-next-line no-undef
  plugins: [require("@headlessui/tailwindcss")],
};
