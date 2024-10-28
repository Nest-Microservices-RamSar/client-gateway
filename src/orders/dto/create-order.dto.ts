import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  public items: OrderItemDto[];
}

// export class CreateOrderDto {
//   @IsNumber()
//   @IsPositive()
//   public totalAmount: number;

//   @IsNumber()
//   @IsPositive()
//   public totalItems: number;

//   @IsEnum(OrderStatusList, {
//     message: `Order status must be one of: ${OrderStatusList.join(', ')}`,
//   })
//   @IsOptional()
//   public status: OrdersStatus = OrdersStatus.PENDING;

//   @IsBoolean()
//   @IsOptional()
//   public paid: boolean = false;
// }
