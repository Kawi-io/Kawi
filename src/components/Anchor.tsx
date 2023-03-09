import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import idl from "./idl.json"
import { MintNft } from "./mint_nft";
import {
    Program, Provider, web3, BN,
} from "@project-serum/anchor";
import { createAssociatedTokenAccount, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { associatedTokenProgram } from "@metaplex-foundation/js";
const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

let mintKeypair:anchor.web3.Keypair

let senderTokenAddress:PublicKey

export async function mint(provider:Provider) {
    
    const testNftTitle = "Sofia";
    const testNftSymbol = "SOF";
    const testNftUri = "https://kawi-testing.vercel.app/metadata/new.json";

    mintKeypair = anchor.web3.Keypair.generate();

    senderTokenAddress = await anchor.utils.token.associatedAddress({
        mint: mintKeypair.publicKey,
        owner: provider.publicKey!
    });

    const a = JSON.stringify(idl);
    const b = JSON.parse(a);
    const program = new Program<MintNft>(b, idl.metadata.address, provider)
    console.log(`New token: ${mintKeypair.publicKey}`);

    // Derive the metadata and master edition addresses

    const metadataAddress = (await anchor.web3.PublicKey.findProgramAddress(
        [
            Buffer.from("metadata"),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mintKeypair.publicKey.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
    ))[0];
    console.log("Metadata initialized");
    const masterEditionAddress = (await anchor.web3.PublicKey.findProgramAddress(
        [
            Buffer.from("metadata"),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mintKeypair.publicKey.toBuffer(),
            Buffer.from("edition"),
        ],
        TOKEN_METADATA_PROGRAM_ID
    ))[0];
    console.log("Master edition metadata initialized");

    // Transact with the "mint" function in our on-chain program
    try{
        let mint = await program.methods.mint(
            testNftTitle, testNftSymbol, testNftUri
        )
            .accounts({
                masterEdition: masterEditionAddress,
                metadata: metadataAddress,
                mint: mintKeypair.publicKey,
                tokenAccount:senderTokenAddress,
                mintAuthority:provider.publicKey,
                tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
            })
            .signers([mintKeypair])
            .rpc();
        if(mint){
            transfer_Nft(provider);
        }
    }catch(e){
        console.log(e)
    }
}

export async function transfer_Nft(provider:Provider){
    const a = JSON.stringify(idl);
    const b = JSON.parse(a);
    const program = new Program<MintNft>(b, idl.metadata.address, provider)

    const toWallet = new anchor.web3.PublicKey("D95DZ1FuFRd56iqUwTFUcMz4tS6Aeqvf3T5YvsPibKms")

    const toATA = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        toWallet
    )
    const mint_tx = new anchor.web3.Transaction().add(
        createAssociatedTokenAccountInstruction(
            provider.publicKey!, toATA, toWallet, mintKeypair.publicKey
        )
    )   

    const res = await provider.sendAndConfirm!(mint_tx,[])

    // console.log(res)
    try{
        const tx = await program.methods.sell().accounts({
            tokenProgram:TOKEN_PROGRAM_ID,
            from:senderTokenAddress,
            to:toATA,
            signer:provider.publicKey
    
        }).rpc()
        console.log(tx)
        console.log("bien")
    }catch(e){
        console.log(e)
        console.log("mal")
    }
} 