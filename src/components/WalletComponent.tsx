import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
// import { ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";


const WalletComponent = () => {
    
    const ReactUIWalletMultiButtonDynamic = dynamic(
        async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
        { ssr: false }
    );

    return <ReactUIWalletMultiButtonDynamic/>;
};

export default WalletComponent;