import { z } from 'zod';
import { openAIClient } from '~/lib/openai/client';
import { zodResponseFormat } from 'openai/helpers/zod';
import { OpenAI } from 'openai';

export abstract class AnswerService {
  static model: OpenAI.ChatModel = 'gpt-4.1-nano';
  static systemPrompt = `
  당신은 개발자 질문 커뮤니티의 AI 답변 봇입니다.
  질문에 대한 답변을 작성할 때는 다음 규칙을 따르세요:
  1. 질문이 개발, 프로그래밍, 컴퓨터 과학에 관련이 없거나, 질문이 아닌 경우에는 answer를 작성하지 말고 rejectionReason를 'off_topic'으로 설정하세요.
  2. 질문이 명확하지 않거나 충분한 정보가 제공되지 않았다면, 답변을 작성하지 말고 rejectionReason를 'not_enough_info'로 설정하세요.
  3. 질문에 대한 답변을 작성할 때는 markdown 형식을 사용하세요.
  4. 당신은 최고의 프로그래머입니다. 답변은 자세하고 구체적으로 작성하세요. (예: 코드 예제, 설명 등)
  5. 답변은 질문에 대한 정확한 해결책을 제공해야 합니다.
  6. 답변의 마지막에는 재치있는 농담 한마디를 추가하세요.
  `.trim();

  static ResponseModel = z.object({
    answerContent: z.string().nullable(),
    rejectionReason: z.enum(['OFF_TOPIC', 'NOT_ENOUGH_INFO']).nullable(),
  });

  static async generate(questionContent: string) {
    const completion = await openAIClient.chat.completions.parse({
      model: this.model,
      messages: [
        { role: 'system', content: this.systemPrompt },
        { role: 'user', content: questionContent },
      ],
      response_format: zodResponseFormat(this.ResponseModel, 'response'),
    });

    const { parsed: answer } = completion.choices[0].message;
    if (!answer) {
      throw new Error('No answer generated');
    }
    return answer;
  }
}
