import { Module } from '@nestjs/common';
import { BankTransfersController } from './controllers/bank-transfers.controller';
import { BankTransfersService } from './services/bank-transfers.service';
import { DbLayerModule } from '../db-layer/db-layer.module';

@Module({
  controllers: [BankTransfersController],
  providers: [BankTransfersService],
  imports: [DbLayerModule],
})
export class BankTransfersModule {}
