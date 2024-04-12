"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrebuchetService = void 0;
const common_1 = require("@nestjs/common");
let TrebuchetService = class TrebuchetService {
    async findTrebuchetAmount(textDto) {
        const texts = textDto.texts.map((singleText) => this.convertNumberWordsToNumbers(singleText));
        let totalAmount = 0;
        for (const text of texts) {
            const foundNumbers = this.findNumbers(text);
            if (foundNumbers.length === 0)
                continue;
            const firstNumber = foundNumbers[0];
            const lastNumber = foundNumbers[foundNumbers.length - 1];
            const newNumber = +`${firstNumber}${lastNumber}`;
            totalAmount += newNumber;
        }
        return totalAmount;
    }
    findNumbers(word) {
        const numbersPack = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const foundNumbers = [];
        const chars = word.split('');
        for (const char of chars) {
            const isNumber = numbersPack.includes(+char);
            if (isNumber) {
                foundNumbers.push(+char);
            }
        }
        return foundNumbers;
    }
    findStringNumbersInWord(word, numberPack) {
        let foundNumberWords = [];
        for (const singleNumberWord of numberPack) {
            let foundWords = word.split(singleNumberWord);
            for (let i = foundWords.length; i-- > 1;)
                foundWords.splice(i, 0, singleNumberWord);
            foundWords = foundWords.filter((singleWord) => singleWord !== '');
            if (foundWords.length === 1)
                continue;
            let charsBefore = 0;
            const wordIndex = foundWords.indexOf(singleNumberWord);
            foundWords.forEach((singleWord, index) => {
                if (index < wordIndex)
                    charsBefore += singleWord.length;
            });
            foundNumberWords.push({
                name: singleNumberWord,
                charsBefore,
            });
        }
        foundNumberWords = foundNumberWords.sort((a, b) => a.charsBefore < b.charsBefore ? -1 : 1);
        return foundNumberWords;
    }
    convertNumberWordsToNumbers(word) {
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
        const foundNumberWords = this.findStringNumbersInWord(word, numberPack);
        const firstNumberWord = foundNumberWords[0];
        const lastNumberWord = foundNumberWords[foundNumberWords.length - 1];
        if (firstNumberWord?.name) {
            newString = newString.replace(firstNumberWord.name, numberPack.indexOf(firstNumberWord.name).toString());
        }
        if (lastNumberWord?.name) {
            newString = newString.replace(lastNumberWord.name, numberPack.indexOf(lastNumberWord.name).toString());
        }
        return newString;
    }
};
exports.TrebuchetService = TrebuchetService;
exports.TrebuchetService = TrebuchetService = __decorate([
    (0, common_1.Injectable)()
], TrebuchetService);
//# sourceMappingURL=trebuchet.service.js.map