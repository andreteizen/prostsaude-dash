import axios from "axios";
import BSON from "bson";

export default async function insertData(data, pdfFile, email) {
    const dados = {
        email: email,
        dat_documento: data.data.dat_documento,
        tipo_documento: data.data.tipo_documento,
        pdfFile: BSON.serialize(pdfFile.file)
    }
    axios.post('/api/insert/nf', dados)
}
