import type { NextApiRequest, NextApiResponse } from 'next';
import type { LinkEmployeeBody } from '../../interfaces/LinkEmployeeBody';
import { MongoClient, UpdateResult, ObjectId } from 'mongodb';

export default async function linkEmployee(    
        req: NextApiRequest,
        res: NextApiResponse
){

    /* eslint-disable */
    const uri = `mongodb+srv://${process.env.USER}:${process.env.PW}@kawi.ibmqes0.mongodb.net/?retryWrites=true&w=majority`;
    /* eslint-disable */

    const client = new MongoClient(uri);

    const database = client.db('Kawi');
    const collection = database.collection('users');
    
    try {
        await client.connect();
        const { employeeID, companyID } = req.body as LinkEmployeeBody;

        console.log(typeof(employeeID));
        console.log(companyID);

        // const idEmployee = new ObjectId(employeeID);
        // const idCompany = new ObjectId(companyID);

        const filterEmployee: any = { _id: employeeID };
        const filterCompany: any = { _id: companyID };
        const updateEmployee = { $push: { companies: companyID } };
        const updateCompany = { $push: { employees: employeeID } };
        const options = { upsert: false };
    
        /* eslint-disable */
        const resultEmployee: UpdateResult = await collection.updateOne(filterEmployee, updateEmployee, options);
        const resultCompany: UpdateResult = await collection.updateOne(filterCompany, updateCompany, options);
        /* eslint-disable */

        if(resultEmployee.modifiedCount > 0 && resultCompany.modifiedCount > 0){
            res.status(200).json({Status: "Success", Message: "Employee and Company linked correctly"});
        }
        else {
            res.status(500).json({Status: "Failed", Message: "Something happened while linking company and employee"});
        }        
    }
    catch(err){
        res.status(500).json({Status: "Error", Error: err});
    }
    finally{
        await client.close();
    }
}
