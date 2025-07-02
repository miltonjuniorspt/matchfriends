'use server';

/**
 * @fileOverview A chat moderation AI agent.
 *
 * - moderateChat - A function that handles the chat moderation process.
 * - ModerateChatInput - The input type for the moderateChat function.
 * - ModerateChatOutput - The return type for the moderateChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateChatInputSchema = z.object({
  text: z.string().describe('The text to moderate.'),
});
export type ModerateChatInput = z.infer<typeof ModerateChatInputSchema>;

const ModerateChatOutputSchema = z.object({
  isSafe: z.boolean().describe('Whether the text is safe or not.'),
  reason: z.string().describe('The reason why the text is not safe.'),
});
export type ModerateChatOutput = z.infer<typeof ModerateChatOutputSchema>;

export async function moderateChat(input: ModerateChatInput): Promise<ModerateChatOutput> {
  return moderateChatFlow(input);
}

const moderateChatPrompt = ai.definePrompt({
  name: 'moderateChatPrompt',
  input: {schema: ModerateChatInputSchema},
  output: {schema: ModerateChatOutputSchema},
  prompt: `You are a moderator bot that checks if the given text is safe for a chat application.

  The chat application prohibits profanity, intolerance, xenophobia, and racism.
  If the text contains any of these, you should set isSafe to false and provide a reason.
  Otherwise, you should set isSafe to true and the reason to 'Text is safe'.

  Text: {{{text}}}`,
});

const moderateChatFlow = ai.defineFlow(
  {
    name: 'moderateChatFlow',
    inputSchema: ModerateChatInputSchema,
    outputSchema: ModerateChatOutputSchema,
  },
  async input => {
    const {output} = await moderateChatPrompt(input);
    return output!;
  }
);
