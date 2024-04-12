import { Test, TestingModule } from '@nestjs/testing';
import { TrebuchetController } from './trebuchet.controller';

describe('TrebuchetController', () => {
  let controller: TrebuchetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrebuchetController],
    }).compile();

    controller = module.get<TrebuchetController>(TrebuchetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
