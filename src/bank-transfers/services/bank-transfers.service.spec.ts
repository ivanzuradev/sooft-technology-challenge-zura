import { Test, TestingModule } from '@nestjs/testing';
import { BankTransfersService } from './bank-transfers.service';
import { PrincipalDbService } from '../../db-layer/services/principal-db.service';

describe('BankTransfersService', () => {
  let service: BankTransfersService;
  let prismaService: PrincipalDbService;

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
      providers: [
        BankTransfersService,
        {
          provide: PrincipalDbService,
          useValue: {
            empresa: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<BankTransfersService>(BankTransfersService);
    prismaService = module.get<PrincipalDbService>(PrincipalDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findCompaniesWithTransfersLastMonth', () => {
    it('Debería devolver las empresas con transferencias en el ultimo mes', async () => {
      jest
        .spyOn(prismaService.empresa, 'findMany')
        .mockResolvedValue(mockCompaniesWithTransfers);

      const result = await service.findCompaniesWithTransfersLastMonth();

      const today = new Date();
      const firstDayLastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1,
      );
      const lastDayLastMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0,
      );

      expect(prismaService.empresa.findMany).toHaveBeenCalledWith({
        where: {
          transferencias: {
            some: {
              fechaTransferencia: {
                gte: expect.any(Date),
                lte: expect.any(Date),
              },
            },
          },
        },
        include: {
          transferencias: {
            where: {
              fechaTransferencia: {
                gte: expect.any(Date),
                lte: expect.any(Date),
              },
            },
          },
        },
      });

      expect(result).toEqual(mockCompaniesWithTransfers);
    });
  });
});
