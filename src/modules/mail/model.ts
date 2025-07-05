import { t } from 'elysia';

export namespace MailModel {
  export const sendRequest = t.Object({
    to: t.String({ format: 'email' }),
    subject: t.String(),
    html: t.String(),
  });
  export const sendResponse = t.Object({ id: t.String() });
}
