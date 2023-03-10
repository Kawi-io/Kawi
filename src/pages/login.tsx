import { Container, Row } from "@nextui-org/react";
import { type NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import WalletComponent from "~/components/WalletComponent";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
const Home: NextPage = () => {
    const router = useRouter();
    const { wallet, publicKey } = useWallet();

    useEffect( () => {
        if(wallet == null || publicKey == null) return
        if(sessionStorage.getItem('publicKey')){
            router.push('/dashboard');
        }
        //aqui tenemos que revisar si la wallet esta registrada
        console.log(publicKey.toBase58())
        
        //guardamos la pbkey
        sessionStorage.setItem('publicKey', publicKey.toBase58());
        router.push('/dashboard');
    }, [wallet])
  return (
    <>
      <Head>
        <title>Login to your account</title>
      </Head>

      <Container>
        <div className="py-10 px-8 sm:px-40">
          <h1 className="text-center px-4 sm:px-0 text-3xl sm:text-5xl">
            Login to your <span className="text-purple">account</span>
          </h1>
        </div>
        <div className="my-3">
          <hr className="border-1 h-0.5 bg-black" />
        </div>
        <Row className="py-24" justify="center">
          <WalletComponent />
        </Row>
      </Container>
    </>
    );
};

export default Home;
