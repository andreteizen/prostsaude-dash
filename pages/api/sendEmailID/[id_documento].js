import sendgrid from "@sendgrid/mail";
import connect from "../../../utils/database";
import { ObjectID } from "bson";

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
                "_id": ObjectID(id_documento)
            });

        const email_completo_html = `<div>
            <p>Bom dia ${data.email.split('@')[0]}</p>
            <ul>
                <li>
                    <a href=${data.thumb} target=_blank>
                        ${data.tipo_documento} - <b>Data Documento: ${data.dat_documento.getDate()}/${data.dat_documento.getMonth()+1}/${data.dat_documento.getFullYear()}</b>
                    </a>
                </li>
            </ul>
            <p>Qualquer dúvida estamos à disposição.<p>
            <p>Ótima semana!</p>
            </div>
            `

        await sendgrid.send({
            to: data.email, // Your email where you'll receive emails
            from: process.env.EMAIL_DEFAULT, // your website email address here
            subject: `${data.tipo_documento} - ${data.dat_vencimento ? ('Data Vencimento: '+ data.dat_vencimento) : ('Data Documento: ' + data.dat_documento)}`,
            html: email_completo_html,
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }

    return res.status(200).json({ success: "Email enviado" });
}

export default sendEmail;