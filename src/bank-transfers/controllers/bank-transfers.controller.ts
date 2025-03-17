import { Controller, Get, UseGuards } from '@nestjs/common';
import { BankTransfersService } from '../services/bank-transfers.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('bank-transfers')
export class BankTransfersController {
  constructor(private readonly bankService: BankTransfersService) {}

  @ApiResponse({
    status: 200,
    description: 'Empresas que realizaron transferencias el último mes.',
    example: [
      {
        id: 1,
        cuit: '30-71237574-8',
        razonSocial: 'Santander',
        fechaAdhesion: '2025-02-10T00:00:00.000Z',
        createdAt: '2025-03-17T00:30:46.127Z',
        updatedAt: '2025-03-17T00:30:46.127Z',
        transferencias: [
          {
            id: 3,
            importe: 12300.75,
            empresaId: 1,
            cuentaDebito: '00012345678',
            cuentaCredito: '00087654321',
            fechaTransferencia: '2025-02-20T00:00:00.000Z',
            createdAt: '2025-03-17T00:30:46.133Z',
            updatedAt: '2025-03-17T00:30:46.133Z',
          },
        ],
      },
      {
        id: 3,
        cuit: '30-71234569-0',
        razonSocial: 'Mercado Libre SRL',
        fechaAdhesion: '2025-01-15T00:00:00.000Z',
        createdAt: '2025-03-17T00:30:46.129Z',
        updatedAt: '2025-03-17T00:30:46.129Z',
        transferencias: [
          {
            id: 4,
            importe: 5400.3,
            empresaId: 3,
            cuentaDebito: '00034567890',
            cuentaCredito: '00009876543',
            fechaTransferencia: '2025-02-15T00:00:00.000Z',
            createdAt: '2025-03-17T00:30:46.134Z',
            updatedAt: '2025-03-17T00:30:46.134Z',
          },
        ],
      },
      {
        id: 4,
        cuit: '30-71765744-1',
        razonSocial: 'Ferretería Coppola',
        fechaAdhesion: '2024-12-20T00:00:00.000Z',
        createdAt: '2025-03-17T00:30:46.129Z',
        updatedAt: '2025-03-17T00:30:46.129Z',
        transferencias: [
          {
            id: 5,
            importe: 7800.6,
            empresaId: 4,
            cuentaDebito: '00045678901',
            cuentaCredito: '00001234567',
            fechaTransferencia: '2025-02-10T00:00:00.000Z',
            createdAt: '2025-03-17T00:30:46.135Z',
            updatedAt: '2025-03-17T00:30:46.135Z',
          },
        ],
      },
    ],
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas.',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @Get('/transfers/report/last-month')
  findCompaniesWithTransfersLastMonth() {
    return this.bankService.findCompaniesWithTransfersLastMonth();
  }
}
