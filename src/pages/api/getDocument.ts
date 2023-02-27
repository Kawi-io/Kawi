import type { NextApiRequest, NextApiResponse } from 'next';
import type { GetRequestBody } from '../../interfaces/GetRequestBody';
import { MongoClient } from 'mongodb';

export default async function getDocument(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const uri = `mongodb+srv://${process.env.USER}:${process.env.PW}@kawi.ibmqes0.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(uri);

    try {
        await client.connect();

        const { id } = req.body as GetRequestBody;

        const database = client.db('Kawi');
        const collection = database.collection('users');

        /* eslint-disable */
        const query: any = { _id: id };
        const result = await collection.findOne(query)
        /* eslint-disable */

        res.status(200).json(result);
        console.log(result);
    } catch (err) {
        // Respuesta en caso de error
        console.log(err)
        res.status(500).json({ err });
    } finally {
        // Cerrar la conexión a db
        await client.close();

    }
}
