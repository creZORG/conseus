import { companyInfo } from "./data";

const url = "https://api.zeptomail.com/v1.1/email";
const token = process.env.ZEPTOMAIL_TOKEN;
const fromEmail = process.env.ZEPTOMAIL_FROM_EMAIL;
const bounceEmail = process.env.ZEPTOMAIL_BOUNCE_EMAIL;

interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

async function sendZeptoEmail(payload: object) {
    if (!token || !fromEmail || !bounceEmail) {
        console.error("ZeptoMail token, from email, or bounce email is not configured in environment variables.");
        throw new Error("Email service is not configured.");
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token, // The token already includes "Zoho-enczapikey " part
            },
            body: JSON.stringify(payload),
        });

        const responseText = await response.text();
        
        if (!response.ok) {
            // Log server response for debugging
            console.error(`ZeptoMail API Error: Status ${response.status}`, responseText);
            throw new Error(`Failed to send email. Status: ${response.status}. Response: ${responseText}`);
        }
        
        // Even successful responses might not be JSON, handle gracefully
        try {
            return JSON.parse(responseText);
        } catch (e) {
            // If parsing fails, just return the raw text
            return responseText;
        }

    } catch (error) {
        console.error("Error during fetch operation:", error);
        throw new Error("Failed to communicate with the email service.");
    }
}


export async function sendContactEmails(data: ContactFormData) {
    const userConfirmationPayload = {
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
    };

    const companyNotificationPayload = {
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
    };

    const [userResult, companyResult] = await Promise.allSettled([
        sendZeptoEmail(userConfirmationPayload),
        sendZeptoEmail(companyNotificationPayload),
    ]);

    if (userResult.status === 'rejected') {
        console.error("Failed to send confirmation email to user:", userResult.reason.message);
    }

    if (companyResult.status === 'rejected') {
        console.error("Failed to send notification email to company:", companyResult.reason.message);
        throw new Error(`Failed to send notification email. Reason: ${companyResult.reason.message}`);
    }
}
