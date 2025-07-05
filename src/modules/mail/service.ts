import { resend } from '~/lib/mail/resend';

export abstract class MailService {
  static async sendMail(to: string, subject: string, html: string) {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM!!,
      to: [to],
      subject,
      html,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { id: data!!.id };
  }
}
