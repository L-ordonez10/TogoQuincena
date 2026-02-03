import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SubmitFormDto } from './dto/submit-form.dto';

@Injectable()
export class HubspotService {
  private readonly logger = new Logger(HubspotService.name);
  private readonly portalId: string;
  private readonly formGuid: string;

  constructor(private configService: ConfigService) {
    this.portalId = this.configService.get<string>(
      'PUBLIC_CRM_PORTAL_ID',
      '50936862',
    );
    this.formGuid = this.configService.get<string>(
      'PUBLIC_CRM_FORM_ID',
      '84a08ec4-1ea6-44e0-b5cf-025a3c679e19',
    );
  }

  async submitFormToHubspot(data: SubmitFormDto) {
    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${this.portalId}/${this.formGuid}`;

    // Validar que los campos requeridos no estén vacíos
    if (!data.email || data.email.trim() === '') {
      throw new Error('El email es requerido');
    }
    if (!data.workName || data.workName.trim() === '') {
      throw new Error('El nombre de la empresa es requerido');
    }

    // Mapeo de campos: combinar apellidos si existe marriedLastName
    const fullLastName = data.marriedLastName
      ? `${data.surnames} ${data.marriedLastName}`.trim()
      : data.surnames;

    // Convertir salary y amountRequested a string
    const salaryValue =
      typeof data.salary === 'number' ? data.salary.toString() : data.salary;
    const amountRequestedValue =
      typeof data.amountRequested === 'number'
        ? data.amountRequested.toString()
        : data.amountRequested;

    const fields = [
      { name: 'firstname', value: data.names },
      { name: 'lastname', value: fullLastName },
      { name: 'email', value: data.email },
      { name: 'company', value: data.workName },
      { name: 'address', value: data.address },
    ];

    // Agregar campos opcionales solo si tienen valor
    if (data.birthDate) {
      fields.push({ name: 'date_of_birth', value: data.birthDate });
    }
    if (data.phone) {
      fields.push({ name: 'phone', value: data.phone });
    }
    if (data.dpi) {
      fields.push({ name: 'dpi', value: data.dpi });
    }
    if (salaryValue && salaryValue !== '0') {
      fields.push({ name: 'salario_mensual', value: salaryValue });
    }
    if (amountRequestedValue && amountRequestedValue !== '0') {
      fields.push({
        name: 'cantidad_solicitada',
        value: amountRequestedValue,
      });
    }

    const payload = {
      fields,
      context: {
        pageUri: this.configService.get<string>(
          'FRONTEND_ORIGIN',
          'https://togoquincena.com',
        ),
        pageName: 'Solicitud de Adelanto',
      },
    };

    try {
      this.logger.log('Enviando datos a HubSpot...');
      this.logger.debug(`Payload HubSpot: ${JSON.stringify(payload, null, 2)}`);

      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      this.logger.log(`✓ Respuesta exitosa de HubSpot: ${response.status}`);
      return {
        success: true,
        message: 'Datos enviados correctamente a HubSpot',
        data: response.data,
      };
    } catch (error) {
      this.logger.error(
        '✗ Error al enviar datos a HubSpot:',
        JSON.stringify(error.response?.data, null, 2) || error.message,
      );
      this.logger.error(
        'Payload que se intentó enviar:',
        JSON.stringify(payload, null, 2),
      );
      throw error;
    }
  }
}
