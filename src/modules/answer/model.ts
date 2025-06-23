import { t } from 'elysia';

export namespace AnswerModel {
  export const generateRequest = t.Object({ questionContent: t.String() });
  export const generateResponse = t.Object({
    answerContent: t.Union([t.String(), t.Null()]),
    rejectionReason: t.Union([t.Literal('OFF_TOPIC'), t.Literal('NOT_ENOUGH_INFO'), t.Null()]),
  });
}
