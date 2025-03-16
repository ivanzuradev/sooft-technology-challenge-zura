import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { PrincipalDbService } from '../../db-layer/services/principal-db.service';
import { CreateCompanyDto } from '../dto/create-company.dto';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let prismaService: PrincipalDbService;

  const mockCompanies = [
    {
      id: 1,
      cuit: '30-53464366-8',
      razonSocial: 'Empresa Increíble S.A.',
      fechaAdhesion: new Date('2025-02-10'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      cuit: '30-71234568-9',
      razonSocial: 'XYZ Tecnología SRL',
      fechaAdhesion: new Date('2025-03-05'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {
          provide: PrincipalDbService,
          useValue: {
            empresa: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
    prismaService = module.get<PrincipalDbService>(PrincipalDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Debería crear una empresa correctamente', async () => {
      const createCompanyDto: CreateCompanyDto = {
        cuit: '30-53464366-8',
        razonSocial: 'Empresa Increíble S.A.',
        fechaAdhesion: '2025-02-10',
      };

      jest.spyOn(prismaService.empresa, 'create').mockResolvedValue(mockCompanies[0]);

      const result = await service.create(createCompanyDto);

      expect(prismaService.empresa.create).toHaveBeenCalledWith({
        data: {
          cuit: createCompanyDto.cuit,
          razonSocial: createCompanyDto.razonSocial,
          fechaAdhesion: new Date(createCompanyDto.fechaAdhesion),
        },
      });

      expect(result).toEqual(mockCompanies[0]);
    });
  });

  describe('findAdheredLastMonth', () => {
    it('Debería devolver las empresas registradas el ultimo mes', async () => {
      jest
        .spyOn(prismaService.empresa, 'findMany')
        .mockResolvedValue(mockCompanies);

      const result = await service.findAdheredLastMonth();

      const today = new Date();
      const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

      expect(prismaService.empresa.findMany).toHaveBeenCalledWith({
        where: {
          fechaAdhesion: {
            gte: expect.any(Date),
            lte: expect.any(Date),
          },
        },
      });

      expect(result).toEqual(mockCompanies);
    });
  });
});
