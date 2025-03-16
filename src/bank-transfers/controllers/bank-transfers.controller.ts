import { Controller, Get, UseGuards } from '@nestjs/common';
import { BankTransfersService } from '../services/bank-transfers.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('bank-transfers')
export class BankTransfersController {
  constructor(private readonly bankService: BankTransfersService) {}

  @Get('/transfers/report/last-month')
  findCompaniesWithTransfersLastMonth() {
    return this.bankService.findCompaniesWithTransfersLastMonth();
  }
}
