import z from 'zod';

export namespace AnswerModel {
  export const generateRequest = z.object({
    questionId: z.number().int().positive(),
    questionTitle: z.string().min(1),
    questionContent: z.string().min(1),
    chatModel: z.literal(['GPT_4_1_MINI', 'GPT_5', 'O3']),
    userInstruction: z.string().optional(),
  });
  export const generateResponse = z.object({
    title: z.string(),
    content: z.string(),
    rejectionReason: z.literal(['NONE', 'OFF_TOPIC', 'NOT_ENOUGH_INFO']),
  });
}
