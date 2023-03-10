import { type NextPage } from "next";
import How from "~/components/How";
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Blockchain, Landing, What, Who } from "~/components/index";

const Home: NextPage = () => {


  return (
    <>
      <Landing />
      <What />
      <How />
      <Blockchain />
      <Who />
    </>
  );
};

export default Home;
