import { Module } from '@nestjs/common';
import { HubspotController } from './hubspot.controller';
import { HubspotService } from './hubspot.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [HubspotController],
  providers: [HubspotService],
  exports: [HubspotService],
})
export class HubspotModule {}
