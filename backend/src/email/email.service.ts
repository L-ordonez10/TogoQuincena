import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: Resend;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    if (!apiKey) {
      this.logger.warn('RESEND_API_KEY no está configurado');
    }
    this.resend = new Resend(apiKey);
  }

  async sendApplicationConfirmation(
    toEmail: string,
    applicantName: string,
    applicationId: number,
  ) {
    try {
      const { data, error } = await this.resend.emails.send({
        from: this.configService.get<string>(
          'RESEND_FROM_EMAIL',
          'onboarding@resend.dev',
        ),
        to: toEmail,
        subject: 'Confirmación de Solicitud - TogoQuincena',
        html: this.getApplicationEmailTemplate(applicantName, applicationId),
      });

      if (error) {
        this.logger.error('Error enviando email:', error);
        throw new Error(error.message);
      }

      this.logger.log(`Email enviado exitosamente a ${toEmail}`);
      return data;
    } catch (err) {
      this.logger.error('Error al enviar email de confirmación:', err);
      throw err instanceof Error ? err : new Error(String(err));
    }
  }

  private getApplicationEmailTemplate(
    applicantName: string,
    applicationId: number,
  ): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 5px 5px;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #4CAF50;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>TogoQuincena</h1>
          </div>
          <div class="content">
            <h2>¡Solicitud Recibida!</h2>
            <p>Estimado/a <strong>${applicantName}</strong>,</p>
            <p>Hemos recibido tu solicitud de crédito correctamente.</p>
            <p><strong>Número de Solicitud:</strong> #${applicationId}</p>
            <p>Nuestro equipo revisará tu información y te contactaremos pronto con una respuesta.</p>
            <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
            <p>¡Gracias por confiar en nosotros!</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} TogoQuincena. Todos los derechos reservados.</p>
          </div>
        </body>
      </html>
    `;
  }
}
