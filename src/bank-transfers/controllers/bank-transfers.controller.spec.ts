import { Test, TestingModule } from '@nestjs/testing';
import { BankTransfersController } from './bank-transfers.controller';
import { BankTransfersService } from '../services/bank-transfers.service';

describe('BankTransfersController', () => {
  let controller: BankTransfersController;
  let service: BankTransfersService;

  const mockCompaniesWithTransfers = [
    {
      id: 1,
      cuit: '30-53464366-8',
      razonSocial: 'Empresa Increíble S.A.',
      fechaAdhesion: new Date('2025-02-10'),
      createdAt: new Date(),
      updatedAt: new Date(),
      transferencias: [
        {
          id: 1,
          importe: 12300.75,
          empresaId: 1,
          cuentaDebito: '00012345678',
          cuentaCredito: '00087654321',
          fechaTransferencia: new Date('2025-02-20'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
    {
      id: 2,
      cuit: '30-71234568-9',
      razonSocial: 'XYZ Tecnología SRL',
      fechaAdhesion: new Date('2025-03-05'),
      createdAt: new Date(),
      updatedAt: new Date(),
      transferencias: [
        {
          id: 2,
          importe: 5400.3,
          empresaId: 2,
          cuentaDebito: '00034567890',
          cuentaCredito: '00009876543',
          fechaTransferencia: new Date('2025-02-15'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankTransfersController],
      providers: [
        {
          provide: BankTransfersService,
          useValue: {
            findCompaniesWithTransfersLastMonth: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BankTransfersController>(BankTransfersController);
    service = module.get<BankTransfersService>(BankTransfersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findCompaniesWithTransfersLastMonth', () => {
    it('Debería devolver las empresas con transferencias en el ultimo mes', async () => {
      jest
        .spyOn(service, 'findCompaniesWithTransfersLastMonth')
        .mockResolvedValue(mockCompaniesWithTransfers);

      const result = await controller.findCompaniesWithTransfersLastMonth();

      expect(service.findCompaniesWithTransfersLastMonth).toHaveBeenCalled();
      expect(result).toEqual(mockCompaniesWithTransfers);
    });
  });
});
