import { Test, TestingModule } from '@nestjs/testing';
import { UserInitService } from './user-init.service';

describe('UserService', () => {
  let service: UserInitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInitService],
    }).compile();

    service = module.get<UserInitService>(UserInitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
