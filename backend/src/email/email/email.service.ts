import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
/**
 * cette fonction permet d'envoyer un email à un utilisateur donné 
 * @param to 
 * @param subject 
 * @param text 
 * @returns 
 */
  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    try {
        const result = await this.transporter.sendMail(mailOptions);
        this.logger.log(`Email envoyé à ${to}`);
        return result;
      } catch (error) {
        this.logger.error(`Échec de l'envoi du courriel à ${to}`, error.stack);
        throw error;
      }
}
}