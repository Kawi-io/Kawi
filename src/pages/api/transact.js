import { Keypair, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';
import { decode } from "bs58";
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
const _connection = new Connection(clusterApiUrl('devnet'));

export default async function register(req, res) {

    const { OwnerSecretKey, reciberWaller, tokenHash } = req.body
    let resultado = await PrepareTransaction(OwnerSecretKey, reciberWaller, tokenHash)
    console.log(resultado)
    if (resultado){
        res.status(200).json({ success: 'Transacrion made successfully' })
    }else{
        res.status(500).json({ error: 'Internal Server Error' })
    }

}
const PrepareTransaction = async (OwnerSecretKey, reciberWaller, tokenHash) => {
    let response = false
    try {
        //Create connection to devnet
        // console.log(OwnerSecretKey);
        let secretKey = decode(OwnerSecretKey);
        // let secretKey = new Uint8Array([])  //use this one if you have a json file as wallet, copy the content and paste in the brackets
        const myKeypair = Keypair.fromSecretKey(secretKey)
        let connection = _connection
        let airdropSignature = await connection.requestAirdrop(
            myKeypair.publicKey, 1000000000
        );

        await connection.confirmTransaction(airdropSignature);
        let mint = new PublicKey(tokenHash)
        let payer = myKeypair
        let owner = myKeypair.publicKey
        let commitment = 'finalized'
        //Get the token accont of this solana address, if it does not exist, create it
        let my_token_account = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            owner,
            commitment,
            false,
            null,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID,
        )
        //same for the reciver
        let receiver_token_account = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            new PublicKey(reciberWaller),
            'finalized',
            false,
            null,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID,
        );
        response = await transfer_tokens(myKeypair, connection, 1, receiver_token_account, my_token_account)

    }
    catch (error) {
      console.log(error)
        response = false
    }
    return response

}

const transfer_tokens = async (wallet, connection, amount, receiver_token_account, from_token_account) => {
    try {
        let payer = wallet
        let source = from_token_account.address
        let destination = receiver_token_account.address
        let owner = wallet
        let multiSigners = [wallet]
        let confirmOptions = false
        let programId = TOKEN_PROGRAM_ID

        const transfer_trx = await transfer(
            connection,
            payer,
            source,
            destination,
            owner,
            amount,
            multiSigners,
            confirmOptions,
            TOKEN_PROGRAM_ID,
        )

        console.log("Transcation signature", transfer_trx);
        console.log("Success!");
        return true
    }
    catch (error) {
      console.log(error)
        return false
    }
}
