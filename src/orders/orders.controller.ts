import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { TokenGuard } from 'src/accounts/token.guard';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';
import { Order, OrderStatus } from './entities/order.entity';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiHeader({
  name: 'x-api-token',
  description: 'Account token of the order owner',
  required: true,
})
@ApiTags('Orders')
@UseGuards(TokenGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiCreatedResponse({
    description: 'Order created sucessfully',
    type: Order,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiForbiddenResponse({
    description: "Order doesn't belong to specified account",
  })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @ApiOkResponse({
    description: 'List of orders sucessfully retrieved',
    type: Order,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiForbiddenResponse({
    description: "Order doesn't belong to specified account",
  })
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @ApiOkResponse({
    description: 'Order by ID sucessfully retrieved',
    type: Order,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiForbiddenResponse({
    description: "Order doesn't belong to specified account",
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @ApiOkResponse({
    description: 'Order by ID sucessfully updated',
    type: Order,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiForbiddenResponse({
    description: "Order doesn't belong to specified account",
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @ApiNoContentResponse({
    description: 'Order by ID sucessfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiForbiddenResponse({
    description: "Order doesn't belong to specified account",
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }

  @MessagePattern('transactions_result', Transport.KAFKA)
  async consumerUpdateStatus(@Payload() message: KafkaMessage) {
    const data = message.value as any;
    const { id, status } = data as { id: string; status: OrderStatus };
    console.log(status);
    await this.ordersService.updateByID(id, { status });
  }
}
