import { useRouter } from "next/router";
import { Grid, Card, Row, Button } from "@nextui-org/react";
import { NftCard } from "./NftCard";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import ModalLoader from "./../../components/ModalLoader"

// TODO: Optimizar NFTGrid y UserGrid
export const NftGrid = () => {
  const [loading, setLoading] = useState(false);
  const wallet = useAnchorWallet();
  const router = useRouter();
  const [nftList, setNftList] = useState<any>([]);
  
  const getTemplates:any = async () => {
    setLoading(true)
    if(wallet == null) return
    console.log(wallet)
    await fetch("api/getJsonMetadata", {
      method: 'POST',
      body: JSON.stringify({
        id:wallet.publicKey.toBase58()
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(async (res) => {
      for (const path of res) {
        try {
          const response = await fetch(path)
          let data = await response.json()
          data.uri = path
          setNftList((prevList:any) => [...prevList, data])
          console.log(nftList)
        } catch (error) {
          console.error(error)
        }
      }
    }).catch((e)=>{
      console.log(e)
    })
    setLoading(false)
  }

  useEffect(() => {
    getTemplates();
  },[wallet])
  useEffect(() => {
    console.log(nftList)
  }, [nftList])
  // Esta accion se llama al hacer click en mint, solo hay que modificarla
  // TODO: Pasar como query param el id del NFT
  const transfer = (path:any) => {
    setLoading(true)
    router.push({pathname:'/dashboard/transfer',query:{
      nft_uri:path
    }
  })
  };

  return (
    <Grid.Container gap={2} justify="center">
      
      { (nftList.length > 0) ? 
      nftList.map((item:any) => (
        <Grid lg={3} sm={4} key={nftList.indexOf(item)}>
          <NftCard
            title={item.name}
            image={item.image}
            description={item.description}
            btnText="Transfer"
            event={()=>transfer(item.uri)}
          />
        </Grid>
      ))
      : <h1>Nada por aquí, trata creando una nueva plantilla {'-->'}</h1>
    }
      <Grid lg={3} sm={4}>
        <Button
          bordered
          ghost
          auto
          css={{ w: "100%", h: "250px" }}
          onPress={() => {setLoading(true); router.push("/dashboard/mint")}}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Button>
        
      <ModalLoader loading={loading}/>
      </Grid>
    </Grid.Container>
  );
};
