import { Module } from '@nestjs/common';
import { TrebuchetController } from './trebuchet.controller';
import { TrebuchetService } from './trebuchet.service';

@Module({
  controllers: [TrebuchetController],
  providers: [TrebuchetService],
  exports: [TrebuchetService],
})
export class TrebuchetModule {}
