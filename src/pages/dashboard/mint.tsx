/* eslint-disable */
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { NftCard } from "../../components/index";
import { Container, Grid } from "@nextui-org/react";
import {Provider,AnchorProvider} from "@project-serum/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { mint } from "../../components/Anchor"
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
    const to = "C8vg99mrXk9CNLKT69RyUoBgqyhhPpQFPHPQA8uVHy5u"
    
    if(provider != null){
      //le mandamos a hablar a la funcion mint, que se comunica con nuestro contrato y crea el nft.
      mint(provider, testNftTitle, testNftSymbol, testNftUri, to);
    }else{
      alert("wallet could not be connected.")
    }
  }

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
                event={doMint}
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
