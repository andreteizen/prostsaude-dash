import connect from "../../../utils/database"


export default async function handler (req,res){
const { db } = await connect();

if (req.method == 'POST'){
    const response = await db.collection('documentos').insertOne({
        tipo_documento: "asda",
        dat_insercao: new Date(),
        dat_documento: "2022-08-03",
        arquivo_pdf: "arquivo"
    })
    res.status(200).json({message: "Ok - insert"})
} else {
    res.status(400).json({message: "GeT"})
}

}

