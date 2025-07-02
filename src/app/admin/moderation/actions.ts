"use server";

import { moderateImage, ModerateImageInput } from '@/ai/flows/moderate-images';
import { moderateChat, ModerateChatInput } from '@/ai/flows/moderate-chat';

export async function handleImageModeration(input: ModerateImageInput) {
  try {
    // Artificial delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 1500));
    const result = await moderateImage(input);
    return result;
  } catch (error) {
    console.error("Image moderation error:", error);
    return { isSafe: false, reason: 'Ocorreu um erro durante a moderação da imagem.' };
  }
}

export async function handleChatModeration(input: ModerateChatInput) {
  try {
    // Artificial delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 1000));
    const result = await moderateChat(input);
    return result;
  } catch (error) {
    console.error("Chat moderation error:", error);
    return { isSafe: false, reason: 'Ocorreu um erro durante a moderação do chat.' };
  }
}
