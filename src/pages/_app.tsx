import { type AppType } from "next/dist/shared/lib/utils";
import { NextUIProvider, createTheme } from "@nextui-org/react";

import "~/styles/globals.css";
import { ContextProvider } from "../components/ContextProvider";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

// Use require instead of import since order matters
// require('antd/dist/antd.dark.less');
require("@solana/wallet-adapter-ant-design/styles.css");
require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

// Estilos de NextUI
const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      // generic colors
      white: "#F1F3F4",
      black: "#000000",

      // background colors (light)
      background: "$white",
      backgroundAlpha: "rgba(255, 255, 255, 0.8)", // used for semi-transparent backgrounds like the navbar
      foreground: "$black",
      backgroundContrast: "$white",

      teal50: "#EAF6F8",
      teal100: "#DAF0F3",
      teal200: "#BBE3EA",
      teal300: "#9CD6E0",
      teal400: "#7DC9D6",
      teal500: "#5EBCCD",
      teal600: "#2A7886",
      teal700: "#1D525B",
      teal800: "#0F2B31",
      teal900: "#020506",

      purple50: "#B47CBF",
      purple100: "#AD6EB8",
      purple200: "#9D53AA",
      purple300: "#83468F",
      purple400: "#6A3873",
      purple500: "#512B58",
      purple600: "#2E1932",
      purple700: "#0C060D",
      purple800: "#000000",
      purple900: "#000000",

      primaryLight: '$teal200',
      primaryLightHover: '$teal300', // commonly used on hover state
      primaryLightActive: '$teal400', // commonly used on pressed state
      primaryLightContrast: '$teal600', // commonly used for text inside the component
      primary: '$teal600',
      primaryBorder: '$teal500',
      primaryBorderHover: '$teal600',
      primarySolidHover: '$teal700',
      primarySolidContrast: '$white', // commonly used for text inside the component
      primaryShadow: '$teal500',

      // brand colors
      secondaryLight: "$purple200",
      secondaryLightHover: "$purple300", // commonly used on hover state
      secondaryLightActive: "$purple400", // commonly used on pressed state
      secondaryLightContrast: "$purple600", // commonly used for text inside the component
      secondary: "$purple600",
      secondaryBorder: "$purple500",
      secondaryBorderHover: "$purple600",
      secondarySolidHover: "$purple700",
      secondarySolidContrast: "$white", // commonly used for text inside the component
      secondaryShadow: "$purple500",

      // ... rest of colors (secondary, success, warning, error, etc)
    },
  },
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <NextUIProvider theme={theme}>
        <ContextProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ContextProvider>
      </NextUIProvider>
    </>
  );
};

export default MyApp;
