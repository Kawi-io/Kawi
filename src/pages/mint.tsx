/* eslint-disable */
import { type NextPage } from "next";
import Head from "next/head";

import Image from "next/image";

import { useEffect, useState } from "react";

import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";

import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

import { getCandyMachineState, mint } from "../components/CandyMachine";

import { useWallet } from "@solana/wallet-adapter-react";

const Mint: NextPage = () => {
  const connection = new Connection(clusterApiUrl("devnet"));

  const metaplex = new Metaplex(connection);

  const { wallet } = useWallet();

  const [walletAvailable, SetWalletAvailable] = useState(false);

  const [candyMachineState, SetCandyMachineState] = useState<any>();

  const candyMachineId = new PublicKey(
    "3zip8cavR98FhUSpTPnF78uwC4s3C4MUXcvecbdduRAz"
  );

  const candyMachineAuthority = new PublicKey(
    "RwELDnxJQkH5VjnZXwHLoK3A44xsbGakyEs114cDqy9"
  );

  const [nftDemo, SetNfteDemo] = useState({
    name: "",
    description: "",
    image: "https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
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

  // const captureKey = (e:any) => {
  //     SetCandyMachineAuthority(new PublicKey(e))
  // }
  return (
    <>
      <title>Mint a new certificate</title>

      <div className="py-10 px-8 sm:px-40">
        <h1 className="text-center px-4 sm:px-0">
          Create some <span className="text-purple">NFTS:</span>
        </h1>
      </div>

      <main className="bg-white">
        <div className="text-center max-w-7xl mx-auto py-6 sm:px-6 sm:px-6 lg:px-8">
          <div>
            <h3>
              {nftDemo.name}: {candyMachineState?.itemsRemaining} remaining
            </h3>
          </div>
          <div className="mt-4">
            {/* este hijo de perra deberia ser blanco y no se por que no se pone blanco */}
            <p className="blanco">{nftDemo.description}</p>
          </div>
          <div className="flex justify-center my-4">
            <Image
              src={nftDemo.image}
              alt={nftDemo.name}
              width={100}
              height={100}
            />
          </div>
          <div className="flex justify-center items-center">
            {/* <div className="mt-5 col-span-6 sm:col-span-3">
              <label
                htmlFor="wallet"
                className="block text-sm font-medium text-gray-700"
              >
                Auth
              </label>
              <input
                type="text"
                name="wallet"
                id="wallet"
                placeholder="Your wallet"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                required
              />
            </div> */}
            <button
              className="
              inline-flex
              items-center
              rounded-full
              px-10
              py-3
              text-sm
              font-medium
              shadow-sm
              focus:outline-none 
              focus:ring-2 
              focus:ring-offset-2
              bg-purple
              hover:bg-purple-900
              focus:ring-purple-500
              text-white
              border-transparent
              w-3/5
              flex justify-center
              "
              title="mint"
              onClick={() => doMint()}
              disabled={!walletAvailable}
            >
              Mint !
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Mint;
/* eslint-disable */
