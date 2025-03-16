import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from '../services/companies.service';
import { CreateCompanyDto } from '../dto/create-company.dto';

describe('CompaniesController', () => {
  let controller: CompaniesController;
  let service: CompaniesService;

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
      controllers: [CompaniesController],
      providers: [
        {
          provide: CompaniesService,
          useValue: {
            create: jest.fn(),
            findAdheredLastMonth: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Debería crear una nueva empresa', async () => {
      const createCompanyDto: CreateCompanyDto = {
        cuit: '30-53464366-8',
        razonSocial: 'Empresa Increíble S.A.',
        fechaAdhesion: '2025-02-10',
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockCompanies[0]);

      const result = await controller.create(createCompanyDto);

      expect(service.create).toHaveBeenCalledWith(createCompanyDto);
      expect(result).toEqual(mockCompanies[0]);
    });
  });

  describe('findAdheredLastMonth', () => {
    it('Debería devolver las empresas registradas el ultimo mes', async () => {
      jest.spyOn(service, 'findAdheredLastMonth').mockResolvedValue(mockCompanies);

      const result = await controller.findAdheredLastMonth();

      expect(service.findAdheredLastMonth).toHaveBeenCalled();
      expect(result).toEqual(mockCompanies);
    });
  });
});
