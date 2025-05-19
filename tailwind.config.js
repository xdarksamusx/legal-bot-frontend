module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false, // Disable Preflight reset
  },
  theme: {
    extend: {},
    height: {
      500: "500px",
    },
  },
  plugins: [],
};
