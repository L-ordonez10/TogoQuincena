import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { HubspotService } from './hubspot.service';
import { SubmitFormDto } from './dto/submit-form.dto';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@Controller('hubspot')
@UseGuards(ApiKeyGuard)
export class HubspotController {
  constructor(private readonly hubspotService: HubspotService) {}

  @Post('submit')
  async submitForm(@Body() submitFormDto: SubmitFormDto) {
    console.log(
      '🚀 ~ HubspotController ~ submitForm ~ submitFormDto:',
      submitFormDto,
    );
    try {
      const result =
        await this.hubspotService.submitFormToHubspot(submitFormDto);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al enviar datos a HubSpot',
          error: error.response?.data || error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
