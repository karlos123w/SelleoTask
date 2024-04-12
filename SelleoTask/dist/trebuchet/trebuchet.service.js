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
    combineNumbers(text) {
        const regex = /\d+/g;
        const matches = text.match(regex);
        if (!matches || matches.length < 1)
            return 0;
        const firstNumber = parseInt(matches[0], 10);
        const lastNumber = parseInt(matches[matches.length - 1], 10);
        const combinedNumber = parseInt(`${firstNumber}${lastNumber}`, 10);
        return combinedNumber;
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
};
exports.TrebuchetService = TrebuchetService;
exports.TrebuchetService = TrebuchetService = __decorate([
    (0, common_1.Injectable)()
], TrebuchetService);
//# sourceMappingURL=trebuchet.service.js.map