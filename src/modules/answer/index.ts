import { Elysia } from 'elysia';
import { AnswerService } from '@/modules/answer/service';
import { AnswerModel } from '@/modules/answer/model';

export const answer = new Elysia({ prefix: '/answer' }).post(
  '/generate',
  ({ body }) => AnswerService.generateAnswer(body),
  {
    body: AnswerModel.generateRequest,
    response: { 200: AnswerModel.generateResponse },
  }
);
