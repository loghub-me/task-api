import { Elysia } from 'elysia';
import { MailService } from '~/modules/mail/service';
import { MailModel } from '~/modules/mail/model';

export const mail = new Elysia({ prefix: '/mail' }).post(
  '/send',
  ({ body: { to, subject, html } }) => MailService.sendMail(to, subject, html),
  {
    body: MailModel.sendRequest,
    response: { 200: MailModel.sendResponse },
  }
);
