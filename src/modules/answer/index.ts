import { Elysia } from 'elysia';
import { AnswerModel } from '~/modules/answer/model';
import { AnswerService } from '~/modules/answer/service';
import { authInternalPlugin } from '~/plugins/auth/internal';

export const answer = new Elysia({ prefix: '/answer' })
  .use(authInternalPlugin)
  .post('/generate', ({ body: { questionContent } }) => AnswerService.generate(questionContent), {
    body: AnswerModel.generateRequest,
    response: { 200: AnswerModel.generateResponse },
  });
