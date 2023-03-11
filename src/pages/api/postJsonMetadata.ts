import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { MongoClient, UpdateResult } from 'mongodb';
import pinataSDK from '@pinata/sdk';
const PINATA_API_KEY = '81accb400029bfb41255';
const PINATA_SECRET_API_KEY = '4206b68a2aefa718e44430cd96d4be4625ad48546c61b1144af54ad91e760a33';
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_SECRET_API_KEY);

/**
 * This API endpoint receives a POST request with a document to be inserted in a MongoDB collection.
 * 
 * @param req The Next.js API request object.
 * @param res The Next.js API response object.
 * 
 * @returns A JSON object containing the result of the insert operation.
 */
export default async function getDocument(
    req: NextApiRequest,
    res: NextApiResponse
) {
    /* eslint-disable */
    const uri = `mongodb+srv://${process.env.USER}:${process.env.PW}@kawi.ibmqes0.mongodb.net/?retryWrites=true&w=majority`;
    /* eslint-disable */

    const client = new MongoClient(uri);
    const database = client.db('Kawi');
    const collection = database.collection('users');

    const { nftName, nftSymbol, nftDesc, background_color, nftImage, companyID } = req.body
    console.log(req.body)
    let aux:any = await create_json_metadata(nftName, nftSymbol, nftDesc, background_color, nftImage, uuidv4())
    
    try {
        await client.connect();
        const filterCompany: any = { _id: companyID };
        console.log(aux[1])
        const updateCompany = { $push: { Metadata_Paths: aux[1] } };
        const options = { upsert: false };
        const resultCompany: UpdateResult = await collection.updateOne(filterCompany, updateCompany, options);

        res.status(200).json({metadata : aux[0], path_insert : resultCompany});
    }
    catch(err){
        res.status(200).json({error: err});
    }
}

async function create_json_metadata(name:String,symbol:String,description:String,bg_color:String, image:String, filename:String) {
    const data = {
        "name": name,
        "symbol": symbol,
        "description": description,
        "background_color": "000000",
        "image": image
    }

    // const filePath = path.join(process.cwd(), 'public/metadata', filename+'.json');

    let relativePath

    const options = {};

    const res = await pinata.pinJSONToIPFS(data, options).then((result) => {
        relativePath = result["IpfsHash"]
        console.log("demo"+relativePath)
    }).catch((err) => {
        console.log(err)
    }); 

    // fs.writeFileSync(filePath, jsonString);

    return [data, relativePath];
}
