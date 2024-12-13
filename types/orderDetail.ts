import { OrderDetails } from "@prisma/client";
import { BaseOption } from "./options";

export interface orderDetailSlice {
  orderDetails: OrderDetails[];
  orderDetailLoading: boolean;
}

export interface NewOrderDetailPayload extends BaseOption {
  productSCId: string;
  orderId: string;
  quantity: number;
}

export interface UpdateOrderDetailPayload
  extends BaseOption,
    NewOrderDetailPayload {
  id: string;
}
export interface DeleteOrderDetailPayload extends BaseOption {
  id: string;
}
