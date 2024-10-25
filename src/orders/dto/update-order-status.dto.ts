import { IsEnum, IsOptional } from 'class-validator';
import { OrdersStatus, OrderStatusList } from '../enum/order.enum';

export class UpdateOrderStatusDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: 'Posible statues are: ' + OrderStatusList.join(', '),
  })
  public status?: OrdersStatus;
}
