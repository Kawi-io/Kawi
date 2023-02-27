/* eslint-disable */
import { type NextPage } from "next";
import { useEffect, useState } from 'react';
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js"
import { Metaplex } from "@metaplex-foundation/js"
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image"

const VerNFTs: NextPage = () => {

    const [nfts, SetNfts] = useState<any>([])
    const [nfts_flag, SetNftsFlag] = useState<any>(false)
    const [element, SetElement] = useState<any>({
        name:"",
        description:"",
        image:"",
    })

    const { name , description , image } = element

    const mx = new Metaplex(new Connection(clusterApiUrl("devnet")))
    
    const { wallet, publicKey } = useWallet();
    
    var images_charged:Boolean = false

    useEffect(() => {

        if(publicKey==null)return
        
        fetchNFTs(publicKey)

    },[publicKey])

    useEffect(() => {

        let aux:any = []
        nfts.map((nft:any)=>{
            console.log(nft)
            fetch(nft.uri).then((res:any)=>res.json()).then((res:any)=>{
                aux.push(res)
            })
        })

        images_charged=true;
        SetNfts(aux)
        
    },[nfts_flag])

    const fetchNFTs = async (owner:PublicKey) => {
        try {
            const list:any = await mx.nfts().findAllByOwner({ owner: owner});

            list.map((element:any) => {
                // SetElement((prev:any) => ({
                //     ...prev,
                //     image:"https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
                // }));
                element.image = "https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
            })
            
            SetNfts(list)
            SetNftsFlag(true)

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
        {nfts.map((element:any) => (
            <div key={nfts.indexOf(element)}>
                <h1>{element.name}</h1>
                <Image src={element.image} alt="" height={100} width={100}></Image>
            </div>
        ))}
        </>
    )
}

export default VerNFTs;
/* eslint-disable */