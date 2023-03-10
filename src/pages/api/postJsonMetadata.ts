import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
const fs = require('fs');
import { MongoClient, UpdateResult } from 'mongodb';
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
    let aux = create_json_metadata(nftName, nftSymbol, nftDesc, background_color, nftImage, uuidv4())

    try {
        await client.connect();
        const filterCompany: any = { _id: companyID };
        const updateCompany = { $push: { Metadata_Paths: aux[1] } };
        const options = { upsert: false };
        const resultCompany: UpdateResult = await collection.updateOne(filterCompany, updateCompany, options);

        res.status(200).json({metadata : aux[0], path_insert : resultCompany});
    }
    catch(err){
        res.status(200).json({error: err});
    }
}

function create_json_metadata(name:String,symbol:String,description:String,bg_color:String, image:String, filename:String) {
    const data = {
        "name": name,
        "symbol": symbol,
        "description": description,
        "background_color": "000000",
        "image": image
    }


  const jsonString = JSON.stringify(data);
  const filePath = path.join(process.cwd(), 'public/metadata', filename+'.json');

  const relativePath = '/public/metadata/'+filename+'/.json';

  fs.writeFileSync(filePath, jsonString);

  return [data, relativePath];
}
