import { type NextPage } from "next";
import { useEffect } from "react";
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
        <WalletComponent/>
    </>
    );
};

export default Home;
