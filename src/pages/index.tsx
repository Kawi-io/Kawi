import { type NextPage } from "next";
import How from "~/components/How";
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Blockchain, Landing, What, Who } from "~/components/index";
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kawi</title>
      </Head>

      <Landing />
      <What />
      <How />
      <Blockchain />
      <Who />
    </>
  );
};

export default Home;
