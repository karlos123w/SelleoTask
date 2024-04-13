import { IsArray, IsNotEmpty } from 'class-validator';

export class TextDto {
  @IsNotEmpty()
  @IsArray()
  texts: string[];
}
