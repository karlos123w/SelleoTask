import { Test, TestingModule } from '@nestjs/testing';
import { TrebuchetService } from './trebuchet.service';

describe('TrebuchetService', () => {
  let service: TrebuchetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrebuchetService],
    }).compile();

    service = module.get<TrebuchetService>(TrebuchetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
