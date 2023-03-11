import type { NextApiRequest, NextApiResponse } from 'next';
import type { GetRequestBody } from '../../interfaces/GetRequestBody';
import { MongoClient } from 'mongodb';

export default async function getJsonMetadata(
    req: NextApiRequest,
    res: NextApiResponse
) {
    /* eslint-disable */
    const uri = `mongodb+srv://${process.env.USER}:${process.env.PW}@kawi.ibmqes0.mongodb.net/?retryWrites=true&w=majority`;
    /* eslint-disable */

    const client = new MongoClient(uri);

    try {
        await client.connect();

        const { id } = req.body as GetRequestBody;

        const database = client.db('Kawi');
        const collection = database.collection('users');

        //Variable para guardar los paths 
        let metadataPaths = [];


        /* eslint-disable */
        const query: any = { _id: id };
        const company = await collection.findOne(query)

        if(company){
            metadataPaths = company.Metadata_Paths;
        }
        
        /* eslint-disable */

        res.status(200).json(metadataPaths);
        
    } catch (err) {
        // Respuesta en caso de error
        console.log(err)
        res.status(500).json({ err });
    } finally {
        // Cerrar la conexión a db
        await client.close();
    }
}
