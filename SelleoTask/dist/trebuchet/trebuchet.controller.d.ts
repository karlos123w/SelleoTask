import { TrebuchetService } from './trebuchet.service';
import { TextDto } from './dtos/text.dto';
export declare class TrebuchetController {
    private readonly trebuchetService;
    constructor(trebuchetService: TrebuchetService);
    findTrebuchetAmount(textDto: TextDto): Promise<number>;
}
