/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            screens: {
                md: "880px",
                lg: "1090px",
            },
            colors: {
                beige: "#F3F3F1",
                beige_dark: "#D9D9D7",
                smoke: "#9C9C9A",
                smoke_dark: "#838381",
                pink_light: "#FFEDF5",
                pink_mid: "#F588B9",
                pink_dark: "#D6699A",
                cod_black: "#262625",
                green_mid: "#A2B87E",
                green_dark: "#95AE6D",
                green_light: "#ECFFCE",
                cod_white: "#FEFEFE",
                blue_dark: "#6B93C0",
                blue_light: "#BADAFF",
                mustard_dark: "#C2BB82",
                mustard_light: "#FFFAC2",
                mustard_mid: "#CAC48E",
                orange_mid: "#F28164",
                orange_light: "#FFBCAB",
                orange_dark: "#D46F55",
                purple_dark: "#8A92E3",
                purple_light: "#EBEDFF",
                purple_mid: "#9FA8FE",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
            },
            animation: {
                marquee: "marquee 30s linear infinite",
            },
        },
    },
    plugins: [],
    darkMode: ["class", '[data-theme="dark"]'],
};
