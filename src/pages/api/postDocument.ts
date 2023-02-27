import type { NextApiRequest, NextApiResponse } from 'next';
import type { GetRequestBody } from '../../interfaces/GetRequestBody';
import { MongoClient } from 'mongodb';

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
    const uri = `mongodb+srv://${process.env.USER}:${process.env.PW}@kawi.ibmqes0.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db('Kawi');
        const collection = database.collection('users');

        const insertResult = await collection.insertOne({
            _id                 : req.body.profile._id,
            about               : req.body.profile.about,
            name                : req.body.profile.name,
            profession          : req.body.profile.profession,
            nationality         : req.body.profile.nationality,
            birthdate           : req.body.profile.birthdate,
            country_residence   : req.body.profile.country_residence,
            email               : req.body.profile.email,
            business_field      : req.body.profile.business_field,
            is_company          : req.body.profile.is_company
        });

        res.status(200).json(insertResult);
    } catch (err) {
        // Respuesta en caso de error
        console.log(err)
        res.status(500).json({ err });
    } finally {
        // Cerrar la conexión a db
        await client.close();

    }
}
