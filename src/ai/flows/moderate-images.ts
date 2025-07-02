// src/ai/flows/moderate-images.ts
'use server';
/**
 * @fileOverview Image moderation flow to check for inappropriate content.
 *
 * - moderateImage - A function that handles the image moderation process.
 * - ModerateImageInput - The input type for the moderateImage function.
 * - ModerateImageOutput - The return type for the moderateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to check for inappropriate content, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ModerateImageInput = z.infer<typeof ModerateImageInputSchema>;

const ModerateImageOutputSchema = z.object({
  isSafe: z.boolean().describe('Whether the image is safe for use.'),
  reason: z.string().describe('The reason for the moderation decision.'),
});
export type ModerateImageOutput = z.infer<typeof ModerateImageOutputSchema>;

export async function moderateImage(input: ModerateImageInput): Promise<ModerateImageOutput> {
  return moderateImageFilterFlow(input);
}

const moderateImageFilterPrompt = ai.definePrompt({
  name: 'moderateImageFilterPrompt',
  input: {schema: ModerateImageInputSchema},
  output: {schema: ModerateImageOutputSchema},
  prompt: `You are an AI safety assistant that determines whether an image contains inappropriate content.

  Analyze the image and determine if it contains nudity, sexual content, depictions of children, or violence.

  Return whether the image is safe or not, and the reason for your decision.

  Image: {{media url=photoDataUri}}`,
});

const moderateImageFilterFlow = ai.defineFlow(
  {
    name: 'moderateImageFilterFlow',
    inputSchema: ModerateImageInputSchema,
    outputSchema: ModerateImageOutputSchema,
  },
  async input => {
    const {output} = await moderateImageFilterPrompt(input);
    return output!;
  }
);
