import connect from "../../../utils/database"


export default async function handler (req,res){
    if (req.method == 'POST'){
        const {email, tipo_documento, dat_documento, pdfFile} = req.body;

        if (!tipo_documento || !dat_documento || !pdfFile) {
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
        res.status(400).json({ error: 'ERROR 0000: Erro ao inserir'})
    }
}

