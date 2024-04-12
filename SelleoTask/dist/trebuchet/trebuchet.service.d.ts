import { TextDto } from './dtos/text.dto';
interface NumberWord {
    name: string;
    charsBefore: number;
}
export declare class TrebuchetService {
    findTrebuchetAmount(textDto: TextDto): Promise<number>;
    findNumbers(word: string): number[];
    findStringNumbersInWord(word: string, numberPack: string[]): NumberWord[];
    convertNumberWordsToNumbers(word: string): string;
}
export {};
