import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
// import { ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";

const WalletComponent = () => {
    
    const { publicKey, wallet } = useWallet();

    useEffect( () => {
        if(publicKey == null) return
        console.log(wallet)
        console.log(publicKey)
    }, [publicKey])

    const ReactUIWalletMultiButtonDynamic = dynamic(
        async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
        { ssr: false }
    );

    return <ReactUIWalletMultiButtonDynamic/>;
};

export default WalletComponent;