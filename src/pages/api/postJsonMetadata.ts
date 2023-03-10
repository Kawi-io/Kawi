import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
const fs = require('fs');
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
    const { nftName, nftSymbol, nftDesc, background_color, nftImage } = req.body
    console.log(req.body)
    let aux = create_json_metadata(nftName, nftSymbol, nftDesc, background_color, nftImage, uuidv4())
    res.status(200).json(aux);
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

  fs.writeFileSync(filePath, jsonString);

  return data;
}
