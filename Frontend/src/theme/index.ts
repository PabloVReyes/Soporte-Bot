import { createTheme } from "@mantine/core";
import { components } from "./components/index"

export const mantineTheme = createTheme({
    fontFamily: "Inter, sans-serif",
    primaryColor: "indigo",
    primaryShade: {
        light: 6,
        dark: 8,
    },
    defaultRadius: 'md',
    headings: {
        fontFamily: 'Poppins, sans-serif',
    },
    components
})