import { ObjectID } from "bson";
import connect from "../../../utils/database"


export default async function handler (req,res){
    const { _id } = req.query;


    if (req.method == 'DELETE'){
        const { db } = await connect();
        await db.collection('documentos').deleteOne({ "_id" : ObjectID(_id) } );

        res.status(200).json({message: "Ok - Deleted"})
    } else {
        res.status(400).json({error: `Erro ao tentar deletar o id: ${_id}`})
    }

}