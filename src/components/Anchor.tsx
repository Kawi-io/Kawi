import { PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import idl from "./idl.json"
import { MintNft } from "./mint_nft";
import { Program, Provider,AnchorProvider } from "@project-serum/anchor";
import { createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

let mintKeypair:anchor.web3.Keypair

let senderTokenAddress:PublicKey


export async function mint(provider:Provider, nftTitle:string, nftSymbol:string, nftUri:string, to:string = "") {

    try{

        mintKeypair = anchor.web3.Keypair.generate();
        
        if(provider == null) return
        senderTokenAddress = await anchor.utils.token.associatedAddress({
            mint: mintKeypair.publicKey,
            owner: provider.publicKey!
        });
    
        
        let owner = await anchor.utils.token.associatedAddress({
            mint: mintKeypair.publicKey,
            owner: new PublicKey(to)
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

        const masterEditionAddress = (await anchor.web3.PublicKey.findProgramAddress(
            [
                Buffer.from("metadata"),
                TOKEN_METADATA_PROGRAM_ID.toBuffer(),
                mintKeypair.publicKey.toBuffer(),
                Buffer.from("edition"),
            ],
            TOKEN_METADATA_PROGRAM_ID
        ))[0];
    // Transact with the "mint" function in our on-chain program
    
        let mint = await program.methods.mint(
            nftTitle, nftSymbol, nftUri
        ).accounts({
                masterEdition: masterEditionAddress,
                metadata: metadataAddress,
                mint: mintKeypair.publicKey,
                toTokenAccount:owner,
                to:new PublicKey(to),

                tokenAccount:senderTokenAddress,
                mintAuthority:provider.publicKey,
                tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
            })
            .signers([mintKeypair])
            .rpc();
        if(mint){
            return mint
        }
        return null
    }catch(e){
        console.log(e)
        return null
    }
}

export async function transfer_Nft(provider:Provider, to:PublicKey){
    const a = JSON.stringify(idl);
    const b = JSON.parse(a);
    const program = new Program<MintNft>(b, idl.metadata.address, provider)

    const toATA = await get_token_account(provider, to);

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

async function get_token_account(provider:Provider, to:PublicKey) {

    const toATA = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        to
    )
    const mint_tx = new anchor.web3.Transaction().add(
        createAssociatedTokenAccountInstruction(
            provider.publicKey!, toATA, to, mintKeypair.publicKey
        )
    )
    const res = await provider.sendAndConfirm!(mint_tx,[])

    console.log(res)
    return toATA;
}