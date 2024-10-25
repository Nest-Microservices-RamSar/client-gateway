export enum OrdersStatus {
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
}

export const OrderStatusList = [
  OrdersStatus.PENDING,
  OrdersStatus.CANCELLED,
  OrdersStatus.DELIVERED,
];
