import { ObjectID } from "bson";
import connect from "../../../utils/database"


export default async function handler (req,res){
    const { _id } = req.query;
    
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });

    if (req.method == 'DELETE'){
        const { db } = await connect();
        await db.collection(process.env.MONGODB_COLLECTION).deleteOne({ "_id" : ObjectID(_id) } );

        res.status(200).json({message: "Ok - Deleted"})
    } else {
        res.status(400).json({error: `Erro ao tentar deletar o id: ${_id}`})
    }

}