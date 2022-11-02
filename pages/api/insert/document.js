import connect from "../../../utils/database";
import { getSession } from 'next-auth/react';
import nc from 'next-connect';
import upload from "../../../utils/upload";
import { ObjectId } from 'mongodb';

const handler = nc()
    .use(upload.single('file'))
    .post(async (req, res) => {         
        const session = await getSession({ req });

        if(!session) {
            res.status(400).json({ error: 'ERROR 0000: Usuário não logado'})
        }

        const {tipo_documento, dat_documento, email} = req.body;

        if (!tipo_documento || !dat_documento || !email ) {
            res.status(400).json({ error: 'ERROR 0001: Está faltando parâmetros no corpo da requisição'})
        }

        const _id = new ObjectId();

        const { db } = await connect();
        const collection = db.collection(process.env.MONGODB_COLLECTION);


        try {
            // Insere no banco
            const res_data = await collection.insertOne({
                _id,
                email,
                tipo_documento,
                dat_documento: new Date(dat_documento),
                thumb: req.file.location,
                dat_insercao: new Date(),
            })
            res.status(200).json({res_data: res_data});
        }
        catch{
            res.status(400).json({error: "Not inserted"})
        }
    })
    .patch(async (req, res) => {
        throw new Error('Throws me around! Error can be caught and handled')
    })

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
