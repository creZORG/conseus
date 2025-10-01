'use server';

/**
 * @fileOverview Generates a product catalog in PDF format using AI.
 *
 * - generateProductCatalog - A function that generates the product catalog.
 * - GenerateProductCatalogInput - The input type for the generateProductCatalog function.
 * - GenerateProductCatalogOutput - The return type for the generateProductCatalog function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductCatalogInputSchema = z.object({
  productDescriptions: z.array(z.string()).describe('An array of product descriptions.'),
});

export type GenerateProductCatalogInput = z.infer<typeof GenerateProductCatalogInputSchema>;

const GenerateProductCatalogOutputSchema = z.object({
  catalogPdfDataUri: z.string().describe('The product catalog in PDF format as a data URI.'),
});

export type GenerateProductCatalogOutput = z.infer<typeof GenerateProductCatalogOutputSchema>;

export async function generateProductCatalog(input: GenerateProductCatalogInput): Promise<GenerateProductCatalogOutput> {
  return generateProductCatalogFlow(input);
}

const productCatalogPrompt = ai.definePrompt({
  name: 'productCatalogPrompt',
  input: {schema: GenerateProductCatalogInputSchema},
  output: {schema: GenerateProductCatalogOutputSchema},
  prompt: `You are an AI assistant specialized in generating product catalogs in PDF format. Review the product descriptions provided and generate a comprehensive catalog in PDF format, encoded as a data URI.

Product Descriptions:
{{#each productDescriptions}}
- {{{this}}}
{{/each}}

Ensure the catalog includes relevant product information and is well-organized.

Return the complete PDF data URI. Do not include any introductory or concluding remarks.
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
