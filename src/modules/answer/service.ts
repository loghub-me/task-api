import { AnswerModel } from '@/modules/answer/model';
import z from 'zod';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import Bun from 'bun';

const SYSTEM_PROMPT_PATH = 'resources/prompts/answer-bot.txt';
const CHAT_MODEL_OPTIONS = {
  GPT_4_1_MINI: {
    model: openai('gpt-4.1-mini'),
    temperature: 0.7,
  },
  GPT_5: {
    model: openai('gpt-5'),
    temperature: 1.0,
  },
  O3: {
    model: openai('o3'),
    temperature: 0.7,
  },
} as const;

export abstract class AnswerService {
  static async generateAnswer(body: z.infer<typeof AnswerModel.generateRequest>) {
    const { model, temperature } = CHAT_MODEL_OPTIONS[body.chatModel];
    const { object } = await generateObject({
      model,
      temperature,
      schema: AnswerModel.generateResponse,
      system: await Bun.file(SYSTEM_PROMPT_PATH).text(),
      prompt: `${body.questionTitle}\n\n${body.questionContent}`,
    });
    return object;
  }
}
