import connect from "../../../utils/database"


export default async function handler (req,res){
    const { db } = await connect();

    if (req.method == 'GET'){
        res.status(200).json({
            _id: 123,
            tipo_documento: "asda",
            dat_insercao: "2022-08-01",
            dat_documento: "2022-08-03",
            arquivo_pdf: "arquivo"
        })
    } else {
        res.status(400).json({message: "GeT"})
    }

}