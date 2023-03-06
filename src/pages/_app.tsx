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

      // brand colors
      primaryLight: "#BBE3EA",
      primaryLightHover: "#9CD6E0", // commonly used on hover state
      primaryLightActive: "#7DC9D6", // commonly used on pressed state
      primaryLightContrast: "#3FAFC3", // commonly used for text inside the component
      primary: "#3FAFC3",
      primaryBorder: "#5EBCCD",
      primaryBorderHover: "#3FAFC3",
      primarySolidHover: "#3494A5",
      primarySolidContrast: "#F1F3F4", // commonly used for text inside the component
      primaryShadow: "#5EBCCD",

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
