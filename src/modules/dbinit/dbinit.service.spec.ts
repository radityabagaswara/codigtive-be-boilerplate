import { Test, TestingModule } from '@nestjs/testing';
import { DbinitService } from './dbinit.service';

describe('DbinitService', () => {
  let service: DbinitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbinitService],
    }).compile();

    service = module.get<DbinitService>(DbinitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
