/* eslint-disable */
import { type NextPage } from "next";
import { useEffect, useState } from 'react';
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js"
import { Metaplex } from "@metaplex-foundation/js"
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image"

const VerNFTs: NextPage = () => {

    const [nfts, SetNfts] = useState<any>([])

    const mx = new Metaplex(new Connection(clusterApiUrl("devnet")))
    
    const { wallet, publicKey } = useWallet();
    
    var images_charged:Boolean = false

    useEffect(() => {

        if(publicKey==null)return
        
        fetchNFTs(publicKey)

    },[publicKey])

    const fetchNFTs = async (owner:PublicKey) => {
        try {
            const list:any = await mx.nfts().findAllByOwner({ owner: owner});
            let aux:any = []
            list.map((e:any) => {
                fetch(e.uri).then(r => r.json()).then((r:any) =>{aux.push(r); SetNfts(aux);})
            })
            
            

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
        {(nfts.length > 0) ? nfts.map((element:any) => (
            <div key={nfts.indexOf(element)}>
                <h1>{element.name}</h1>
                <Image src={element.image} alt="" height={100} width={100}></Image>
            </div>
        )) : <div>
            <h1>cargando...</h1>
            <Image src={"https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"} alt="" height={100} width={100}></Image>
        </div>}
        </>
    )
}

export default VerNFTs;
/* eslint-disable */