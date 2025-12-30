import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly resend: Resend;
  private readonly fromEmail: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');

    if (!apiKey) {
      this.logger.error('RESEND_API_KEY no está configurado');
      throw new Error('Falta RESEND_API_KEY');
    }

    this.resend = new Resend(apiKey);

    this.fromEmail =
      this.configService.get<string>('RESEND_FROM_EMAIL') ??
      'noreply@quincenatogo.com.gt';

    this.logger.log(`EmailService inicializado con from=${this.fromEmail}`);
  }

  async sendApplicationConfirmation(
    toEmail: string,
    applicantName: string,
    applicationId: number,
  ) {
    try {
      const { data, error } = await this.resend.emails.send({
        from: `QuincenaToGo <${this.fromEmail}>`,
        to: toEmail,
        subject: 'Confirmación de Solicitud - QuincenaToGo',
        html: this.getApplicationEmailTemplate(applicantName, applicationId),
      });

      if (error) {
        this.logger.error('Error enviando email:', error);
        throw new Error(error.message);
      }

      this.logger.log(`Email enviado exitosamente a ${toEmail}`);
      return data;
    } catch (error) {
      this.logger.error('Error al enviar email de confirmación', error);
      throw error;
    }
  }

  private getApplicationEmailTemplate(
    applicantName: string,
    applicationId: number,
  ): string {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Confirmación de Solicitud</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:6px;overflow:hidden">
          <tr>
            <td style="background:#90C928;color:#ffffff;padding:20px;text-align:center">
              <h1 style="margin:0">QuincenaToGo</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:30px;color:#333">
              <h2>¡Solicitud recibida!</h2>
              <p>Estimado/a <strong>${applicantName}</strong>,</p>
              <p>Hemos recibido tu solicitud correctamente.</p>
              <p><strong>Número de solicitud:</strong> #${applicationId}</p>
              <p>Nuestro equipo revisará tu información y te contactará pronto.</p>
              <p>Gracias por confiar en nosotros.</p>
            </td>
          </tr>
          <tr>
            <td style="background:#f9f9f9;padding:15px;text-align:center;font-size:12px;color:#666">
              © ${new Date().getFullYear()} QuincenaToGo. Todos los derechos reservados.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
  }
}
