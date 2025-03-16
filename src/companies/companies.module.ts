import { Module } from '@nestjs/common';
import { CompaniesController } from './controllers/companies.controller';
import { CompaniesService } from './services/companies.service';
import { DbLayerModule } from '../db-layer/db-layer.module';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [DbLayerModule],
})
export class CompaniesModule {}
