import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";
import { ContextProvider } from '../components/ContextProvider';

// Use require instead of import since order matters
// require('antd/dist/antd.dark.less');
require('@solana/wallet-adapter-ant-design/styles.css');
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const MyApp: AppType = ({ Component, pageProps }) => {
  return (<>
    <ContextProvider>
        <Component {...pageProps} />
    </ContextProvider>
  </>)
};

export default MyApp;
