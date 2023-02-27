import styles from "./mint.module.css";
import { type NextPage } from "next";
import Head from "next/head";

import Image from "next/image"

import { useEffect, useState } from 'react';

import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";

import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

import { getCandyMachineState, getNftPrice, mint } from "../components/CandyMachine";

import { useWallet } from "@solana/wallet-adapter-react";

const Mint: NextPage = () => {
    const connection = new Connection(clusterApiUrl("devnet"));

    const metaplex = new Metaplex(connection);

    const { wallet } = useWallet();

    const [walletAvailable, SetWalletAvailable] = useState(false);

    const [candyMachineState, SetCandyMachineState] = useState<any>()

    const candyMachineId=new PublicKey("3zip8cavR98FhUSpTPnF78uwC4s3C4MUXcvecbdduRAz");

    const [candyMachineAuthority, SetCandyMachineAuthority] = useState(new PublicKey("RwELDnxJQkH5VjnZXwHLoK3A44xsbGakyEs114cDqy9"));

    const [nftDemo,SetNfteDemo] = useState(
        {
            "name":"",
            "description":"",
            "image":"https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
            "symbol":""
        }
    );
    
    useEffect(() => {
        checkCandyMachineState();
    },[])

    useEffect(() => {
        SetWalletAvailable(wallet!=null && candyMachineState!= null)
    },[wallet])

    useEffect(() => {
        SetWalletAvailable(wallet!=null && candyMachineState!= null)
    },[candyMachineState])

    const checkCandyMachineState = async () => {
        let aux:any = await getCandyMachineState(metaplex,candyMachineId);
        SetCandyMachineState(aux);
        let uri = aux.items[0].uri
        fetch(uri)
            .then(response => response.json())
        .then(data => SetNfteDemo(data));
        
    };

    const doMint = async () => {
        console.log("minting...")
        console.log(wallet)
        metaplex.use(walletAdapterIdentity(wallet!.adapter))
        const nft = await mint(metaplex, candyMachineState!, candyMachineAuthority);

        if (nft) {
            alert("nft minted")
        } else {
            alert("Wait a few seconds to se your nft reflected")
        }
    }

    const captureKey = (e:any) => {
        SetCandyMachineAuthority(new PublicKey(e))
    }
    return (
        <>
        <Head>
            <title>Create T3 App</title>
            <meta name="description" content="Generated by create-t3-app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Create some <span className={styles.pinkSpan}>NFTS:</span>
                </h1>
                <h3>{nftDemo.name}: {candyMachineState?.itemsRemaining} remaining</h3>
                <div>
                    {/* este hijo de perra deberia ser blanco y no se por que no se pone blanco */}
                    <p className="blanco">{nftDemo.description}</p>
                </div>
                <div>
                    <Image src={nftDemo.image} alt={nftDemo.name} width={100} height={100}/>
                </div>
                {/* <input onChange={(e) => captureKey(e.target.value)}></input> */}
                <button title="mint" onClick={() => doMint()} disabled={!walletAvailable}>Mint!</button>
            </div>
        </main>
        </>
    );
};

export default Mint;
