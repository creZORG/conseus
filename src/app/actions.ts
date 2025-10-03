"use server";

import { z } from "zod";
import { sendContactEmails } from "@/lib/mail";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function handleContactForm(formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries());
    const parsed = contactFormSchema.safeParse(rawFormData);
  
    if (!parsed.success) {
      return { success: false, errors: parsed.error.flatten().fieldErrors };
    }
  
    try {
      await sendContactEmails(parsed.data);
      return { success: true };
    } catch (error) {
      console.error("Error handling contact form:", error);
      return { success: false, errors: { _server: ["An unexpected error occurred while sending the message."] } };
    }
}
