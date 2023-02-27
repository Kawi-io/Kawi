import { NextApiRequest, NextApiResponse } from 'next';
import { GetRequestBody } from '../../interfaces/GetRequestBody';
import { MongoClient } from 'mongodb';

export default async function getDocument(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const uri = `mongodb+srv://admin:xWAbf9y0JtWoF0hZ@kawi.ibmqes0.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(uri);

    try {
        await client.connect();

        const { coll, id } = req.body as GetRequestBody;

        const database = client.db('Kawi');
        const collection = database.collection(coll);

        const query: any = { _id: id };
        const result = await collection.findOne(query)

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
