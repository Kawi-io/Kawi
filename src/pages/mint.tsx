/* eslint-disable */
import { type NextPage } from "next";

import {
  Provider,AnchorProvider
} from "@project-serum/anchor";

import { mint } from "../components/Anchor"

import { useEffect, useState } from "react";

import {  Connection, clusterApiUrl } from "@solana/web3.js";

import { useAnchorWallet } from "@solana/wallet-adapter-react";

const Mint: NextPage = () => {
  const wallet = useAnchorWallet();

  //esta funcion agarre el provider del front, es decir, conecta con phantom wallet para pedir confirmacion de transacciones
  const getProvider = () => {
    //verificamos que la wallet este connectada, si no, no lo dejamos continuar
    if (!wallet) return null
    //creamos una connection con la red, en este caso la red de desarollo, devnet, pero podria ser testnet, o mainnet
    const _connection = new Connection(clusterApiUrl("devnet"),"processed")
    // el provider es como una connecion con la wallet, es el que pide firmas y asi
    const provider = new AnchorProvider(_connection, wallet, {"preflightCommitment":"processed"} ) as Provider
    //y devolvemos el provider
    return provider;
  }

  const doMint = async () => {
    console.log("minting...");

    //nos traemos el provider del usuario
    const provider = getProvider()
    
    //El nombre del NFT, este será guardado ON-CHAIN, lo que significa que no podra ser cambiado facilmente
    const testNftTitle = "Sofia";
    //El simbolo de nuestro NFT, igualmente guardado ON-CHAIN
    const testNftSymbol = "SOF";
    //La URL del JSON con la metadata de nuestro NFT. Este debería estar en nuestros servidores, y de ser modificado modificaria
    //la metadata de nuestro NFT, propiedades como la imagen, el fondo, u otras que quieran ser agregadas
    //testNftUri tiene que ser un arhivo previamente generado para cada plantilla de NFT
    const testNftUri = "https://kawi-testing.vercel.app/metadata/new.json";
    
    //esta será la wallet a la cual será transferido el NFT una vez minteado. Si no se desea transferir se puede dejar en blanco
    //o no mandarla directamente
    const to = ""
    
    if(provider != null){
      //le mandamos a hablar a la funcion mint, que se comunica con nuestro contrato y crea el nft.
      mint(provider, testNftTitle, testNftSymbol, testNftUri, to);
    }else{
      alert("wallet could not be connected.")
    }
  };

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

          <div className="flex justify-center items-center">
            <div className="mt-5 col-span-6 sm:col-span-3">
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
            </div>
            <div className="mt-5 col-span-6 sm:col-span-3">
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
            </div>
            <div className="mt-5 col-span-6 sm:col-span-3">
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
            </div>
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
              // disabled={!walletAvailable}
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
