import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { OrdersPaginatioDto } from 'src/common/dto';
import { NATS_SERVICE } from 'src/config';
import { CreateOrderDto } from './dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto);
  }

  @Get()
  async findAll(@Query() orderPaginationDto: OrdersPaginatioDto) {
    try {
      const orders = await firstValueFrom(
        this.client.send('findAllOrders', orderPaginationDto),
      );
      return orders;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param() id: string) {
    try {
      const order = await firstValueFrom(this.client.send('findOneOrder', id));
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  // @UseGuards()
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    try {
      return this.client.send('updateOrderStatus', {
        id,
        status: updateOrderStatusDto.status,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
