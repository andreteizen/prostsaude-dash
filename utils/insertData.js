import axios from "axios";

export default async function insertData(data, pdfFile, email) {
    const email_saving = (typeof data.data.email === 'undefined') ? email : data.data.email

    const dados = {
        email: email_saving,
        dat_documento: data.data.dat_documento,
        tipo_documento: data.data.tipo_documento,
        pdfFile: pdfFile?.file
    }
    axios.post('/api/insert/document', dados)
        .then(() => {
            console.log('Ok')
        })
        .catch((err) => {
            console.log(err)
        })
}
