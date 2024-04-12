import { Injectable } from '@nestjs/common';
import { TextDto } from './dtos/text.dto';

interface NumberWord {
  name: string;
  charsBefore: number;
}

@Injectable()
export class TrebuchetService {
  async findTrebuchetAmount(textDto: TextDto): Promise<number> {
    const texts = textDto.texts.map((singleText) =>
      this.convertNumberWordsToNumbers(singleText),
    );

    let totalAmount = 0;

    for (const text of texts) {
      const foundNumbers = this.findNumbers(text);
      if (foundNumbers.length === 0) continue;
      const firstNumber = foundNumbers[0];
      const lastNumber = foundNumbers[foundNumbers.length - 1];

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

  findStringNumbersInWord(word: string, numberPack: string[]): NumberWord[] {
    let foundNumberWords = [];
    for (const singleNumberWord of numberPack) {
      let foundWords = word.split(singleNumberWord);
      for (let i = foundWords.length; i-- > 1; )
        foundWords.splice(i, 0, singleNumberWord);
      foundWords = foundWords.filter((singleWord) => singleWord !== '');

      if (foundWords.length === 1) continue;
      let charsBefore = 0;
      const wordIndex = foundWords.indexOf(singleNumberWord);
      foundWords.forEach((singleWord, index) => {
        if (index < wordIndex) charsBefore += singleWord.length;
      });
      foundNumberWords.push({
        name: singleNumberWord,
        charsBefore,
      });
    }

    foundNumberWords = foundNumberWords.sort((a, b) =>
      a.charsBefore < b.charsBefore ? -1 : 1,
    );
    return foundNumberWords;
  }

  convertNumberWordsToNumbers(word: string): string {
    let newString = word;
    const numberPack = [
      'zero',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
    ];
    const foundNumberWords: NumberWord[] = this.findStringNumbersInWord(
      word,
      numberPack,
    );

    const firstNumberWord = foundNumberWords[0];
    const lastNumberWord = foundNumberWords[foundNumberWords.length - 1];

    if (firstNumberWord?.name) {
      newString = newString.replace(
        firstNumberWord.name,
        numberPack.indexOf(firstNumberWord.name).toString(),
      );
    }
    if (lastNumberWord?.name) {
      newString = newString.replace(
        lastNumberWord.name,
        numberPack.indexOf(lastNumberWord.name).toString(),
      );
    }
    return newString;
  }
}
