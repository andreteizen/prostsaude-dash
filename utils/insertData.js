import axios from "axios";

export default async function insertData(data, pdfFile) {
    const dados = {
        dat_documento: data.data.dat_documento,
        tipo_documento: data.data.tipo_documento,
        pdfFile: pdfFile.file
    }
    axios.post('/api/insert/document', dados)
}
