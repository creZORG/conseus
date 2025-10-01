"use server";

import { generateProductCatalog } from "@/ai/flows/generate-product-catalog";
import { products } from "@/lib/data";
import { z } from "zod";

export async function handleGenerateCatalog() {
  try {
    const productDescriptions = products.map(p => `${p.name}: ${p.description}`);
    const result = await generateProductCatalog({ productDescriptions });
    return { success: true, data: result.catalogPdfDataUri };
  } catch (error) {
    console.error("Error generating catalog:", error);
    return { success: false, error: "Failed to generate catalog." };
  }
}

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
      // In a real application, you would send an email, save to a database, etc.
      console.log("Contact form submitted:", parsed.data);
      return { success: true };
    } catch (error) {
      console.error("Error handling contact form:", error);
      return { success: false, errors: { _server: ["An unexpected error occurred."] } };
    }
}
