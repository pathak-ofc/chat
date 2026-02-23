import { resendClient, sender } from '../lib/resend.js';
import { createWelcomeEmailTemplate } from '../emails/emailTemplates.js';


export const sendWelcomeEmail = async (email, name, clientURL)  => {
    try {
        const { data, error } = await resendClient.emails.send({
            from: `${sender.displayname} <${sender.email}>`,
            to: email,
            subject: 'Welcome to Chatify!',
            html: createWelcomeEmailTemplate(name, clientURL),
        });

        if (error) {
            return console.error({ error });
        }
        console.log(`Email sent successfully: ${data}`);
    } catch (err) {
        console.error("Error sending welcome email:", err);
    }
}; 