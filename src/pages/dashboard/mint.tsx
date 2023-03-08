/* eslint-disable */
import { type NextPage } from "next";
import Head from "next/head";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

import { getCandyMachineState, mint, NftCard } from "../../components/index";
import { Container, Grid } from "@nextui-org/react";

const nftsTest = [
  {
    name: "1 year with Kawi",
    description: "You have been working wit Kawi for a year, congrats",
    image:
      "https://media.giphy.com/media/h2VRjenjc8ly5JGUN0/giphy-downsized-large.gif",
    symbol: "",
  },
  {
    name: "1 year with Kawi",
    description: "You have been working wit Kawi for a year, congrats",
    image:
      "https://media.giphy.com/media/h2VRjenjc8ly5JGUN0/giphy-downsized-large.gif",
    symbol: "",
  },
];

const Mint: NextPage = () => {
  const [walletAvailable, SetWalletAvailable] = useState(false);
  const [candyMachineState, SetCandyMachineState] = useState<any>();
  const { wallet } = useWallet();

  const connection = new Connection(clusterApiUrl("devnet"));

  const metaplex = new Metaplex(connection);

  const candyMachineId = new PublicKey(
    "F9Z379ypQZmQB9Mige7eBqYyNdNRVYW5hg6Nog56xE1S"
  );

  const candyMachineAuthority = new PublicKey(
    "RwELDnxJQkH5VjnZXwHLoK3A44xsbGakyEs114cDqy9"
  );

  const [nftDemo, SetNfteDemo] = useState({
    name: "1 year with Kawi",
    description: "You have been working wit Kawi for a year, congrats",
    image:
      "https://media.giphy.com/media/h2VRjenjc8ly5JGUN0/giphy-downsized-large.gif",
    symbol: "",
  });

  useEffect(() => {
    checkCandyMachineState();
  }, []);

  useEffect(() => {
    SetWalletAvailable(wallet != null && candyMachineState != null);
  }, [wallet]);

  useEffect(() => {
    SetWalletAvailable(wallet != null && candyMachineState != null);
  }, [candyMachineState]);

  const checkCandyMachineState = async () => {
    let aux: any = await getCandyMachineState(metaplex, candyMachineId);
    SetCandyMachineState(aux);
    let uri = aux.items[0].uri;
    fetch(uri)
      .then((response) => response.json())
      .then((data) => SetNfteDemo(data));
  };

  const doMint = async () => {
    console.log("minting...");
    console.log(wallet);
    metaplex.use(walletAdapterIdentity(wallet!.adapter));
    const nft = await mint(metaplex, candyMachineState!, candyMachineAuthority);

    if (nft) {
      alert("nft minted");
    } else {
      alert("Wait a few seconds to se your nft reflected");
    }
  };

  // Esta accion se llama al hacer click en mint, solo hay que modificarla
  const mintTest = () => {
    console.log("HOLA");
  };

  // const captureKey = (e:any) => {
  //     SetCandyMachineAuthority(new PublicKey(e))
  // }
  return (
    <>
      <Head>
        <title>Mint a new certificate</title>
      </Head>

      <Container className="p-3">
        <div className="py-10 px-8 sm:px-40">
          <h1 className="text-center px-4 sm:px-0 sm:text-5xl">
            Mint a new <span className="text-purple">certificate</span>
          </h1>
        </div>
        <div className="my-3">
          <hr className="border-1 h-0.5 bg-black" />
        </div>

        <Grid.Container gap={2} justify="center">
          {nftsTest.map((nft) => (
            <Grid lg={3} sm={4}>
              <NftCard
                title={nft.name}
                image={nft.image}
                description={nft.description}
                event={mintTest}
                btnText="Mint"
              />
            </Grid>
          ))}
        </Grid.Container>
      </Container>
    </>
  );
};

export default Mint;
/* eslint-disable */
