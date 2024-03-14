import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreditCardRequestDto {
  @ApiProperty({ required: true, example: '2222 3333 4444 5555' })
  @IsNotEmpty()
  @IsString()
  cardNumber: string;

  @ApiProperty({ required: true, example: 'Olga Malaniak' })
  @IsNotEmpty()
  @IsString()
  cardHolderName: string;

  @ApiProperty({ required: true, example: '07/28' })
  @IsNotEmpty()
  @IsString()
  expirationDate: string;

  @ApiProperty({ required: true, example: '245' })
  @IsNotEmpty()
  @IsString()
  cvv: string;
}
