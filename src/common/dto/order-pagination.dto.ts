import { IsEnum, IsOptional } from 'class-validator';
import { OrdersStatus } from 'src/orders/enum/order.enum';
import { PaginationDto } from './pagination.dto';

export class OrdersPaginatioDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrdersStatus, {
    message: `Possible statues values area: ${OrdersStatus}`,
  })
  public status?: OrdersStatus;
}
