import type { NextApiRequest, NextApiResponse } from 'next';
import type { GetRequestBody } from '../../interfaces/GetRequestBody';
import { MongoClient } from 'mongodb';

export default async function getNFTMetadata(
    req: NextApiRequest,
    res: NextApiResponse
) {


    try {

        const { id } = req.body as GetRequestBody;

        res.status(200).json(
            {
                "description": "A test for our NFT example.",
                "seller_fee_basis_points": 5,
                "external_url": "",
                "edition": "",
                "background_color": "000000",
                "image": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Mr._Krabs.svg/800px-Mr._Krabs.svg.png"
            }
        );
        console.log();
    } catch (err) {
        // Respuesta en caso de error
        console.log(err)
        res.status(500).json({ err });
    } 
}
