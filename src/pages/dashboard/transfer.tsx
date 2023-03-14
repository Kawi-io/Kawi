/* eslint-disable */
import { GetServerSideProps, NextPage } from "next";
import React, { useState, useEffect } from "react";
import { Metaplex } from "@metaplex-foundation/js";
import { clusterApiUrl, Connection, type PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { Container, Button, Row, Col, Text, Dropdown } from "@nextui-org/react";
import ModalLoader from "./../../components/ModalLoader";
import { useRouter } from "next/router";
import { NftCard } from "../../components/index";
import { Provider, AnchorProvider } from "@project-serum/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { mint } from "../../components/Anchor";
import Head from "next/head";
import { CustomModal } from "../../components/index";
import { Employee } from "~/interfaces/Employee";

type Option = {
  key: string;
  value: string;
};

const _connection = new Connection(clusterApiUrl("devnet"));
const mx = Metaplex.make(_connection);
const Transfer: NextPage = () => {
  const [modal, setModal] = useState({
    title: "",
    text: "",
    color: "",
    visible: false,
  });
  const [loading, setLoading] = useState(false);
  const { publicKey } = useWallet();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { nft_uri } = router.query;
  const wallet = useAnchorWallet();
  const [nft, setNft] = useState<any>({});
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/getEmployees", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: sessionStorage.getItem("publicKey"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        console.log(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(()=>{
    if(employees.length>0){
      formData.target = employees[0]
      
    }
  },[employees])

  useEffect(() => {
    const publicKey = sessionStorage.getItem("publicKey");
    //si no hay pubkey, o si la que hay no esta registrada como empresa
    if (!publicKey) {
      router.push("/");
    } else {
      setIsLoggedIn(true);
      getNftInfo(nft_uri);
    }
  }, []);
  useEffect(() => {
    if (publicKey == null) {
      return;
    }
    // fetchNFTs(list.length, publicKey);
  }, [publicKey]);
  const getNftInfo = async (path: any) => {
    const response = await fetch(path);
    let data = await response.json();
    data.uri = path;
    setNft(data);
  };
  //esta funcion agarre el provider del front, es decir, conecta con phantom wallet para pedir confirmacion de transacciones
  const getProvider = () => {
    //verificamos que la wallet este connectada, si no, no lo dejamos continuar
    if (!wallet) return null;
    //creamos una connection con la red, en este caso la red de desarollo, devnet, pero podria ser testnet, o mainnet
    const _connection = new Connection(clusterApiUrl("devnet"), "processed");
    // el provider es como una connecion con la wallet, es el que pide firmas y asi
    const provider = new AnchorProvider(_connection, wallet, {
      preflightCommitment: "processed",
    }) as Provider;
    //y devolvemos el provider
    return provider;
  };
  const doMint = async (to:string) => {
    setLoading(true);
    console.log(to)
    console.log("minting...");

    //El nombre del NFT, este será guardado ON-CHAIN, lo que significa que no podra ser cambiado facilmente
    const testNftTitle = nft.name;
    //El simbolo de nuestro NFT, igualmente guardado ON-CHAIN
    const testNftSymbol = nft.symbol;
    //La URL del JSON con la metadata de nuestro NFT. Este debería estar en nuestros servidores, y de ser modificado modificaria
    //la metadata de nuestro NFT, propiedades como la imagen, el fondo, u otras que quieran ser agregadas
    //testNftUri tiene que ser un arhivo previamente generado para cada plantilla de NFT
    const testNftUri = nft.uri;
    console.log(testNftUri);
    //esta será la wallet a la cual será transferido el NFT una vez minteado. Si no se desea transferir se puede dejar en blanco
    //o no mandarla directamente
    // const to = "9U7ZTupH5jVP51F91d8gc79NNVbV9am29RtQTuuMxmow";
    let _mint = await mint(
      getProvider()!,
      testNftTitle,
      testNftSymbol,
      testNftUri,
      to
    );
    //le mandamos a hablar a la funcion mint, que se comunica con nuestro contrato y crea el nft.
    // let _mint:any = mint(getProvider()!,testNftTitle, testNftSymbol, testNftUri, to);
    setLoading(false);
    if (_mint != null) {
      setModal({
        ...modal,
        visible: true,
        title: "Success",
        text: "El certificado fue creado de manera exitosa",
      });
    } else {
      setModal({
        ...modal,
        visible: true,
        title: "Error",
        text: "There was an error signing the transacrion",
      });
    }
  };

  useEffect(() => {
    const publicKey = sessionStorage.getItem("publicKey");
    const isCompany = sessionStorage.getItem("isCompany");

    //si no hay pubkey, o si la que hay no esta registrada como empresa
    if (!publicKey || isCompany == "false") {
      router.push("/");
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    if (publicKey == null) {
      return;
    }
    // fetchNFTs(list.length, publicKey);
  }, [publicKey]);

  const [formData, setFormData] = useState<any>({
    target: "",
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(formData)
    doMint(formData.target._id);
  };

  const handleInputChange = ({ target }: any) => {
    const { name, value } = target;

    setFormData((prevData:any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  return (
    <>
      <Head>
        <title>Transfer an NFT</title>
      </Head>

      {isLoggedIn ? (
        <Container className="p-3">
          <div className="py-10 px-8 sm:px-40">
            <h1 className="text-center px-4 sm:px-0 text-3xl sm:text-5xl">
              Certificate an <span className="text-purple">employee</span>
            </h1>
          </div>
          <div className="my-3">
            <hr className="border-1 h-0.5 bg-black" />
          </div>

          <Row justify="center" className="my-5">
            <Col span={6}>
              <NftCard
                title={nft.name + " para "}
                image={nft.image}
                description={nft.desc}
                symbol={nft.symbol}
              />
            </Col>
            <Col span={6}>
              <div className="p-10">
                <div>
                  <Text>You're about to send the nft: "{nft.name}" </Text>
                  <Text>From: {publicKey?.toBase58()} </Text>
                </div>

                <form onSubmit={handleFormSubmit} className="mt-5 block">
                  <div className="col-span-6 sm:col-span-3">
                    <div className="mt-5 col-span-6 sm:col-span-3">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="employee"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          To the employee ...
                        </label>
                        <select
                          onChange={(event)=>{handleInputChange(event)}}
                          id="employee"
                          name="employee"
                          className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          {employees.map((user) => (
                            <option
                              key={employees.indexOf(user)}
                              value={user._id}
                            >
                              {user.name}: {user._id}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 text-center sm:px-6 mt-4">
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
                      bg-teal
                      hover:bg-teal-900
                      focus:ring-teal-500
                      text-white
                      border-transparent
                      w-full
                      flex justify-center
                    "
                      type="submit"
                    >
                      <span>Transfer</span>
                    </button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
          <ModalLoader loading={loading} />
          <CustomModal
            visible={modal.visible}
            title={modal.title}
            text={modal.text}
            close={() => setModal({ ...modal, visible: false })}
          />
        </Container>
      ) : (
        <ModalLoader loading={true} />
      )}
    </>
  );
};

export default Transfer;
/* eslint-disable */
