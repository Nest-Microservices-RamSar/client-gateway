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
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { OrdersPaginatioDto } from 'src/common/dto';
import { ORDER_SERVICE } from 'src/config';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

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
    return this.ordersClient.send('findAllOrders', orderPaginationDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
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
  // @UseGuards()
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    try {
      return this.ordersClient.send('updateOrderStatus', {
        id,
        status: updateOrderStatusDto.status,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
