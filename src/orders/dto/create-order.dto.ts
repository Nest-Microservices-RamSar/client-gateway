import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { OrdersStatus, OrderStatusList } from '../enum/order.enum';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  public totalAmount: number;

  @IsNumber()
  @IsPositive()
  public totalItems: number;

  @IsEnum(OrderStatusList, {
    message: `Order status must be one of: ${OrderStatusList.join(', ')}`,
  })
  @IsOptional()
  public status: OrdersStatus = OrdersStatus.PENDING;

  @IsBoolean()
  @IsOptional()
  public paid: boolean = false;
}
