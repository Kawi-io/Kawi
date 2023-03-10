import { useState, useEffect } from "react";
import { NextPage } from "next";
import { Container, Button, Card, Row, Text } from "@nextui-org/react";

import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { mint } from "../../components/Anchor"
import ModalLoader from "./../../components/ModalLoader"
import { NftGrid, UserGrid } from "~/components/index";
import { Program, Provider,AnchorProvider } from "@project-serum/anchor";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Index: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [isNftList, setIsNftList] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
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
  
  useEffect(() => {
    const publicKey = sessionStorage.getItem('publicKey');
    //si no hay pubkey, o si la que hay no esta registrada como empresa

    // setIsLoggedIn(true);
    if (!publicKey) router.push('/');
    else setIsLoggedIn(true);
    
  }, []);

  const doMint = async () => {
    setLoading(true)
    console.log("minting...");
    
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
  
    //le mandamos a hablar a la funcion mint, que se comunica con nuestro contrato y crea el nft.
    let _mint:any = mint(getProvider()!,testNftTitle, testNftSymbol, testNftUri, to);

    if(_mint != null){
      
    }
      setLoading(false)
    
  }
  return (
    <>
        <Container className="p-3">
        {/* <div className="py-4">
          <h3 className="text-center">{isNftList ? "Your NFTs" : "Your employees"}</h3>
        </div> */}

        <div className="py-2">
          <div className="hidden sm:block">
            <div
              className="isolate flex divide-x divide-gray-200 rounded-lg"
              aria-label="Tabs"
            >
              <button
                onClick={() => setIsNftList(true)}
                className={classNames(
                  isNftList
                    ? "text-gray-900"
                    : "text-gray-400 hover:text-gray-700",
                  "rounded-l-lg",
                  "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
                )}
                aria-current={isNftList}
              >
                <span className="text-lg"> My certificates </span>
              </button>
              <button
                onClick={() => setIsNftList(false)}
                className={classNames(
                  !isNftList
                    ? "text-gray-900"
                    : "text-gray-400 hover:text-gray-700",
                  "rounded-r-lg",
                  "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
                )}
                aria-current={!isNftList}
              >
                <span className="text-lg">My employees</span>
              </button>
            </div>
          </div>


          <div className="m-2">
            <hr className="border-1 h-0.5 bg-black" />
          </div>
        </div>
        <div className="">{isNftList ? <NftGrid /> : <UserGrid />}</div>
        <ModalLoader loading={loading}/>
      </Container>
    </>
  );
};

export default Index;
