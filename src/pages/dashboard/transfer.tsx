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
import Head from 'next/head';
type Props = { host: string | null };
export const getServerSideProps: GetServerSideProps<any> = async (context) => ({
  props: { host: context.req.headers.host || null },
});
// TODO: Eliminar despues, esto es para pruebas
const users = [
  {
    name: "John Doe",
    wallet: "fys78d6fas211c341fd2s",
  },
  {
    name: "John Doe",
    wallet: "fys78d6fas211c341fd2s",
  },
  {
    name: "John Doe",
    wallet: "fys78d6fas211c341fd2s",
  },
];

type Option = {
  key: string;
  value: string;
};

const _connection = new Connection(clusterApiUrl("devnet"));
const mx = Metaplex.make(_connection);
const Transfer: NextPage<Props> = ({ host }) => {
  const [loading, setLoading] = useState(false);
  const { publicKey } = useWallet();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { nft_uri } = router.query;
  const wallet = useAnchorWallet();
  const [nft, setNft] = useState<any>({});
  useEffect(() => {
    getNftInfo(nft_uri);
  }, []);
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
  const doMint = async () => {
    setLoading(true);
    console.log("minting...");

    //El nombre del NFT, este será guardado ON-CHAIN, lo que significa que no podra ser cambiado facilmente
    const testNftTitle = nft.name;
    //El simbolo de nuestro NFT, igualmente guardado ON-CHAIN
    const testNftSymbol = nft.symbol;
    //La URL del JSON con la metadata de nuestro NFT. Este debería estar en nuestros servidores, y de ser modificado modificaria
    //la metadata de nuestro NFT, propiedades como la imagen, el fondo, u otras que quieran ser agregadas
    //testNftUri tiene que ser un arhivo previamente generado para cada plantilla de NFT
    const testNftUri = host + nft.uri;

    //esta será la wallet a la cual será transferido el NFT una vez minteado. Si no se desea transferir se puede dejar en blanco
    //o no mandarla directamente
    const to = "8nMCsEURuBzwqGXHPt46BoeFR4LugLesPy6sLjKkMEN6";
    let _mint = mint(
      getProvider()!,
      testNftTitle,
      testNftSymbol,
      testNftUri,
      to
    );
    //le mandamos a hablar a la funcion mint, que se comunica con nuestro contrato y crea el nft.
    // let _mint:any = mint(getProvider()!,testNftTitle, testNftSymbol, testNftUri, to);

    if (_mint != null) {
      alert("minteo correocto");
    }
    setLoading(false);
  };

  useEffect(() => {
    const publicKey = sessionStorage.getItem("publicKey");
    //si no hay pubkey, o si la que hay no esta registrada como empresa
    if (!publicKey) {
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

  const [formData, setFormData] = useState({
    wallet: "",
    certificate: "",
    privateKey: "",
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("queso");
    // await PrepareTransaction();
    doMint();
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addElementsToList = (text: string, value: string) => {
    const newOption: Option = { key: text, value: value };
    setList((prevList) => [...prevList, newOption]);
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
                  <Text>You're about to send an "NFT name" </Text>
                  <Text>From: "Wallet" </Text>
                </div>

                <form onSubmit={handleFormSubmit} className="mt-5 block">
                  <div className="col-span-6 sm:col-span-3">
                    <div className="mt-5 col-span-6 sm:col-span-3">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="employee"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Employee ...
                        </label>
                        <select
                          id="employee"
                          name="employee"
                          className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          {users.map((user) => (
                            <option
                              key={users.indexOf(user)}
                              value={user.wallet}
                            >
                              {user.name}: {user.wallet}
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
        </Container>
      ) : (
        <ModalLoader loading={true} />
      )}
    </>
  );
};

export default Transfer;
/* eslint-disable */
