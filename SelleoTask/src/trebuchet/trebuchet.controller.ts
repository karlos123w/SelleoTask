import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrebuchetService } from './trebuchet.service';
import { TextDto } from './dtos/text.dto';

@Controller('trebuchet')
@ApiTags('Trebuchet')
export class TrebuchetController {
  constructor(private readonly trebuchetService: TrebuchetService) {}

  @Post('find-amount')
  async findTrebuchetAmount(@Body() textDto: TextDto) {
    return await this.trebuchetService.findTrebuchetAmount(textDto);
  }
}
