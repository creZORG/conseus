import { companyInfo } from "./data";

const url = "https://api.zeptomail.com/v1.1/email";
// Hardcoded token for testing, as requested.
const token = "Zoho-enczapikey wSsVR610qR+mWqoum2WoculrkAkHUVP/FBl6jADyuH+tFvqW9Mc+nk2YAASlTfMbQzVpFGNApbl4nh5T12Za3Y8pzVpVDyiF9mqRe1U4J3x17qnvhDzPVmRblRGLL4gOwwxjkmRgFsEh+g==";
// Hardcoded from/bounce addresses for testing.
const fromEmail = "noreply@conquistar.co.ke";
const bounceEmail = "noreply@conquistar.co.ke";

interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

async function sendZeptoEmail(payload: object) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(payload),
        });

        const responseText = await response.text();
        
        if (!response.ok) {
            console.error(`ZeptoMail API Error: Status ${response.status}`, responseText);
            throw new Error(`Failed to send email. Status: ${response.status}. Response: ${responseText}`);
        }
        
        try {
            return JSON.parse(responseText);
        } catch (e) {
            return responseText;
        }

    } catch (error) {
        console.error("Error during fetch operation:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to communicate with the email service. ${error.message}`);
        }
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
