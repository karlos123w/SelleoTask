import { Injectable } from '@nestjs/common';
import { TextDto } from './dtos/text.dto';

@Injectable()
export class TrebuchetService {
  async findTrebuchetAmount(textDto: TextDto): Promise<number> {
    const { texts } = textDto;
    let totalAmount = 0;

    for (const text of texts) {
      const foundNumbers = this.findNumbers(text);
      const firstNumber = foundNumbers[0];
      const lastNumber = foundNumbers[foundNumbers.length - 1];
      console.log('1:', firstNumber, '2:', lastNumber);

      const newNumber = +`${firstNumber}${lastNumber}`;
      totalAmount += newNumber;
    }

    return totalAmount;
  }

  findNumbers(word: string): number[] {
    const numbersPack = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const foundNumbers: number[] = [];
    const chars = word.split('');
    for (const char of chars) {
      const isNumber = numbersPack.includes(+char);
      if (isNumber) {
        foundNumbers.push(+char);
      }
    }
    return foundNumbers;
  }
}
