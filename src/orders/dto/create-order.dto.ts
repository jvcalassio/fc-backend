import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  credit_card_number: string;

  @ApiProperty()
  credit_card_name: string;

  @ApiProperty()
  credit_card_exp_month: number;

  @ApiProperty()
  credit_card_exp_year: number;
}
