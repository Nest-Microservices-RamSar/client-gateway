import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OrdersPaginatioDto } from 'src/common/dto';
import { ORDER_SERVICE } from 'src/config';
import { CreateOrderDto, UpdateOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrdersPaginatioDto) {
    return this.ordersClient.send('findAllOrders', orderPaginationDto);
  }

  @Get(':id')
  async findOne(@Param() id: string) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send('findOneOrder', id),
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  updateStatus(@Param('id') id: number, updateOrderDto: UpdateOrderDto) {
    return this.ordersClient.send('updateOrderStatus', {
      id,
      updateOrderDto,
    });
  }
}
