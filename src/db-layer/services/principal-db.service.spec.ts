import { Test, TestingModule } from '@nestjs/testing';
import { PrincipalDbService } from './principal-db.service';

describe('PrincipalDbService', () => {
  let service: PrincipalDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrincipalDbService],
    }).compile();

    service = module.get<PrincipalDbService>(PrincipalDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
