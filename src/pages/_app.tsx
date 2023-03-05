import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";
import { ContextProvider } from '../components/ContextProvider';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';


// required for charts --------------------------------------------
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// required for charts --------------------------------------------
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
// required for charts --------------------------------------------

// Use require instead of import since order matters
// require('antd/dist/antd.dark.less');
require('@solana/wallet-adapter-ant-design/styles.css');
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const MyApp: AppType = ({ Component, pageProps }) => {
  return (<>
    
    <ContextProvider>
    {/* <Header /> */}
        <Component {...pageProps} />
    <Footer />
    </ContextProvider>
  </>)
};

export default MyApp;
