import connect from "../../../utils/database";
import { getSession } from 'next-auth/react';
import nc from 'next-connect';
import upload from "../../../utils/upload";


const handler = nc()
    .use(upload.single('file'))
    .post(async (req, res) => {
        const session = await getSession({ req });
/*
        if(!session) {
            res.status(400).json({ error: 'ERROR 0000: Usuário não logado'})
        }*/

        const {tipo_documento, dat_documento, email} = req.body;

        if (!tipo_documento || !dat_documento || !email ) {
            res.status(400).json({ error: 'ERROR 0001: Está faltando parâmetros no corpo da requisição'})
        }

        const { db } = await connect();
        const collection = db.collection('uploadFiles');

        await collection.insertOne({
            email,
            tipo_documento,
            dat_documento,
            thumb: req.file.location,
            dat_insercao: new Date(),
        });
        console.log(req.file);
        res.status(200).json({ok: true});

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

/*
export default async function handler (req,res){
    const session = await getSession({ req });




    if (req.method == 'POST'){

        if(!session) {
            res.status(400).json({ error: 'ERROR 0000: Usuário não logado'})
        }
        
        const {tipo_documento, dat_documento, pdfFile, email} = req.body;

        if (!tipo_documento || !dat_documento || !pdfFile || !email ) {
            res.status(400).json({ error: 'ERROR 0001: Está faltando parâmetros no corpo da requisição'})
        }

        const { db } = await connect();

        await db.collection('documentos').insertOne({
            email,
            tipo_documento,
            dat_insercao: new Date(),
            dat_documento,
            pdfFile
        })
        res.status(200).json({message: "Ok - inserted"})
    } 
    else {
        res.status(400).json({ error: 'ERROR 0002: Erro ao inserir'})
    }
}*/

