import sendgrid from "@sendgrid/mail";
import connect from "../../../utils/database";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
    try {
        const { email_to } = req.query
        const { db } = await connect();
        
        const date_today = new Date();
        const first_day_actual_month = new Date(date_today.getFullYear(), date_today.getMonth(), 1)
        const first_day_next_month = new Date(date_today.getFullYear(), date_today.getMonth()+1, 1)
        const month = date_today.toLocaleString('default', {month: 'long'});

        var data = await db
          .collection(process.env.MONGODB_COLLECTION)
          .find(
            { 
                email: email_to,
                dat_documento: {$gte: first_day_actual_month, $lt: first_day_next_month}
            }).toArray();

        var list_documentos = '';


        for(var index = 0; index < data.length; index++){
            list_documentos += `
                <li key=${data[index]._id}>
                    <a href=${data[index].thumb} target=_blank>
                        ${data[index].tipo_documento} - <b>Data Documento: ${data[index].dat_documento.getDate()}/${data[index].dat_documento.getMonth()+1}/${data[index].dat_documento.getFullYear()}</b>
                    </a>
                </li>\n`
        }

        const email_completo_html = `<div>
            <p>Bom dia ${email_to.split('@')[0]}</p>
            <p>Conforme prevê a legislação, segue link para os documentos referentes ao mês ${month}/${date_today.getFullYear()}, conforme relação abaixo:</p>
            <ul>
                <li>Resumo Mensal</li>
                ${list_documentos}
            </ul>
            <p>Qualquer dúvida estamos à disposição.<p>
            <p>Ótima semana!</p>
            </div>
            `

        await sendgrid.send({
            to: email_to, // Your email where you'll receive emails
            from: process.env.EMAIL_DEFAULT, // your website email address here
            subject: `Documentos referentes ao mês - ${month.charAt(0).toUpperCase() + month.slice(1)}`,
            html: email_completo_html,
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }

    return res.status(200).json({ success: "Email enviado" });
}

export default sendEmail;