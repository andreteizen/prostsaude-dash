import sendgrid from "@sendgrid/mail";
import connect from "../../../utils/database";
import { ObjectId } from 'mongodb';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
    try {
        /*
        const session = await getSession({ req });
        
        if(!session) {
            res.status(400).json({ error: 'ERROR 0000: Usuário não logado'})
        }
        */

        const { id_documento } = req.query
        const { db } = await connect();

        var data = await db
          .collection(process.env.MONGODB_COLLECTION)
          .findOne(
            { 
                "_id": new ObjectId(id_documento)
            });

            
        const date_doc = data?.dat_documento;
        const month = date_doc.toLocaleString('default', {month: 'long'});
        const nome_titular = data.email.split(/[^a-zA-Z0-9 ]/g)[0]
            
        const email_completo_html = `<div>
        <p style="font-size: 18px">Olá, <b style="font-size: 18px">${nome_titular.charAt(0).toUpperCase() + nome_titular.slice(1)}</b></p>
        <p style="font-size: 18px">Segue o link para o <b style="font-size: 18px">${data.tipo_documento}</b> de ${data.dat_documento.getDate()}/${data.dat_documento.getMonth()+1}/${data.dat_documento.getFullYear()}</b><br/><br/>
        
        <a href=${data.thumb} target=_blank style="
        color: #ffffff;
        background-color: #ff00ff;
        font-size: 16px;
        border: 0px solid #7300ff;
        border-radius: 14px;
        padding: 15px 20px;
        cursor: pointer;
        text-decoration:none;
        ">
            <b>Visualizar - ${data.tipo_documento}</b>
        </a>
        <br/>
        <br/>
        
        <p style="font-size: 16px">Qualquer dúvida estamos à disposição.<p>
        <p style="font-size: 16px">Tenha uma ótima semana!</p>
        </div>
        `

        await sendgrid.send({
            to: data.email, // Your email where you'll receive emails
            from: process.env.EMAIL_DEFAULT, // your website email address here
            subject: `${data.tipo_documento.charAt(0).toUpperCase() + data.tipo_documento.slice(1)} - ${month.charAt(0).toUpperCase() + month.slice(1)}/${data.dat_documento.getFullYear()}`,
            html: email_completo_html,
            
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }

    return res.status(200).json({ success: "Email enviado" });
}

export default sendEmail;