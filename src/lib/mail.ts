import { SendMailClient } from "zeptomail";
import { companyInfo } from "./data";

const url = "api.zeptomail.com/";
// Ensure you have these in your .env.local file
const token = process.env.ZEPTOMAIL_TOKEN;
const fromEmail = process.env.ZEPTOMAIL_FROM_EMAIL;
const bounceEmail = process.env.ZEPTOMAIL_BOUNCE_EMAIL;


if (!token || !fromEmail || !bounceEmail) {
    console.error("ZeptoMail token, from email, or bounce email is not configured in environment variables.");
    throw new Error("Email service is not configured.");
}

const client = new SendMailClient({ url, token });

interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

export async function sendContactEmails(data: ContactFormData) {
    // 1. Send confirmation email to the user
    const userConfirmationPromise = client.sendMail({
        bounce_address: bounceEmail,
        from: {
            address: fromEmail,
            name: `${companyInfo.name}`,
        },
        to: [
            {
                email_address: {
                    address: data.email,
                    name: data.name,
                },
            },
        ],
        subject: "We've Received Your Inquiry!",
        htmlbody: `
            <div>
                <h2>Hi ${data.name},</h2>
                <p>Thank you for contacting ${companyInfo.name}. We have received your message and will get back to you as soon as possible.</p>
                <p>Here's a copy of your inquiry:</p>
                <blockquote>
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
                    <p><strong>Message:</strong></p>
                    <p>${data.message}</p>
                </blockquote>
                <br/>
                <p>Best Regards,</p>
                <p>The ${companyInfo.name} Team</p>
            </div>
        `,
    });

    // 2. Send notification email to the company
    const companyNotificationPromise = client.sendMail({
        bounce_address: bounceEmail,
        from: {
            address: fromEmail,
            name: "New Website Inquiry",
        },
        to: [
            { email_address: { address: companyInfo.email1, name: companyInfo.name } },
            { email_address: { address: companyInfo.email2, name: companyInfo.name } },
        ],
        subject: `New Contact Form Submission from ${data.name}`,
        htmlbody: `
            <div>
                <h2>New Inquiry from the Website</h2>
                <p>You have received a new message from a website visitor. Here are the details:</p>
                <hr>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
                <p><strong>Message:</strong></p>
                <p>${data.message}</p>
                <hr>
            </div>
        `,
    });

    // Wait for both emails to be sent
    const [userResult, companyResult] = await Promise.allSettled([
        userConfirmationPromise,
        companyNotificationPromise,
    ]);

    if (userResult.status === 'rejected') {
        const reason = userResult.reason as any;
        const detailedError = reason?.message || JSON.stringify(reason);
        console.error("Failed to send confirmation email to user:", detailedError);
    }

    if (companyResult.status === 'rejected') {
        // Log the detailed error from the mail service
        const reason = companyResult.reason as any;
        const detailedError = reason?.message || JSON.stringify(reason);
        console.error("Failed to send notification email to company:", detailedError);
        
        // Throw a more specific error
        throw new Error(`Failed to send notification email. Reason: ${detailedError}`);
    }
}
