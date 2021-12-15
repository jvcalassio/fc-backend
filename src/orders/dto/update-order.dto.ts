import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../entities/order.entity';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    required: false,
    enum: OrderStatus,
  })
  status?: OrderStatus;

  @ApiProperty({ required: false })
  amount?: number;

  @ApiProperty({ required: false })
  credit_card_number?: string;

  @ApiProperty({ required: false })
  credit_card_name?: string;

  @ApiProperty({ required: false })
  credit_card_exp_month?: number;

  @ApiProperty({ required: false })
  credit_card_exp_year?: number;
}
