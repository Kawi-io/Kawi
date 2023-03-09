import type { NextApiRequest, NextApiResponse } from 'next';
import type { GetRequestBody } from '../../interfaces/GetRequestBody';
import { MongoClient } from 'mongodb';

export default async function getEmployees(
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

        //Variable para guardar los IDs de los empleados de la empresa
        let employeesID = [];
        //Variable para guardar los datos de los empleados
        let employeesData: any = [];

        /* eslint-disable */
        const query: any = { _id: id };
        const company = await collection.findOne(query)

        if(company){
            employeesID = company.employees;
        }

        //Se buscan los usuarios que estén dentro del array de IDs
        const cursor = collection.find({ _id: { $in: employeesID } });

        //Los empleados encontrados se guardan en el array de datos
        await cursor.forEach((employee: any) => {
            employeesData.push(employee);
        });
        
        /* eslint-disable */

        res.status(200).json(employeesData);
        
    } catch (err) {
        // Respuesta en caso de error
        console.log(err)
        res.status(500).json({ err });
    } finally {
        // Cerrar la conexión a db
        await client.close();
    }
}
