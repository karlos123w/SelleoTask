import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { TrebuchetService } from './trebuchet.service';
import { TextDto } from './dtos/text.dto';
import { SwaggerForFindTrebuchetAmount } from './swagger/find.trebuchet.amount.swagger';
import { FindTrebuchetAmount } from './swagger/titles/trebuchet.titles.swagger';

@Controller('trebuchet')
@ApiTags('Trebuchet')
export class TrebuchetController {
  constructor(private readonly trebuchetService: TrebuchetService) {}

  @Post('find-amount')
  @SwaggerForFindTrebuchetAmount
  @FindTrebuchetAmount
  @ApiBody({ type: TextDto })
  async findTrebuchetAmount(@Body() textDto: TextDto) {
    return await this.trebuchetService.findTrebuchetAmount(textDto);
  }
}
