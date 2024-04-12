import { TextDto } from './dtos/text.dto';
export declare class TrebuchetService {
    findTrebuchetAmount(textDto: TextDto): Promise<number>;
    private combineNumbers;
    findNumbers(word: string): number[];
}
