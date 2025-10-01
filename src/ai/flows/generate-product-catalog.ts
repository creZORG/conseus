'use server';

/**
 * @fileOverview Generates a product catalog in HTML format using AI.
 *
 * - generateProductCatalog - A function that generates the product catalog.
 * - GenerateProductCatalogInput - The input type for the generateProductCatalog function.
 * - GenerateProductCatalogOutput - The return type for the generateProductCatalog function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductCatalogInputSchema = z.object({
  productDescriptions: z.array(z.string()).describe('An array of product categories and their items.'),
});

export type GenerateProductCatalogInput = z.infer<typeof GenerateProductCatalogInputSchema>;

const GenerateProductCatalogOutputSchema = z.object({
  catalogHtml: z.string().describe('The product catalog in a single, styled HTML string.'),
});

export type GenerateProductCatalogOutput = z.infer<typeof GenerateProductCatalogOutputSchema>;

export async function generateProductCatalog(input: GenerateProductCatalogInput): Promise<GenerateProductCatalogOutput> {
  return generateProductCatalogFlow(input);
}

const productCatalogPrompt = ai.definePrompt({
  name: 'productCatalogPrompt',
  input: {schema: GenerateProductCatalogInputSchema},
  output: {schema: GenerateProductCatalogOutputSchema},
  prompt: `You are an AI assistant specialized in generating a product catalog. Your task is to create a single, well-styled HTML string for a product catalog based on the provided product descriptions.

The HTML should be a complete, self-contained document, including all necessary CSS for a professional and printable layout. Use a clean, modern design.

- The main title should be "Conquistar Enterprises Product Catalog".
- Each product category should be a section with a clear heading.
- The items within each category should be presented in a list.
- Use inline CSS within a <style> tag in the <head> of the HTML. Do not use external stylesheets.

Product Descriptions:
{{#each productDescriptions}}
- {{{this}}}
{{/each}}

Return only the complete HTML string. Do not include any introductory or concluding remarks.
`,
});

const generateProductCatalogFlow = ai.defineFlow(
  {
    name: 'generateProductCatalogFlow',
    inputSchema: GenerateProductCatalogInputSchema,
    outputSchema: GenerateProductCatalogOutputSchema,
  },
  async input => {
    const {output} = await productCatalogPrompt(input);
    return output!;
  }
);
