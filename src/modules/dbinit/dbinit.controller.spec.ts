import { Test, TestingModule } from '@nestjs/testing';
import { DbinitController } from './dbinit.controller';

describe('DbinitController', () => {
  let controller: DbinitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DbinitController],
    }).compile();

    controller = module.get<DbinitController>(DbinitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
