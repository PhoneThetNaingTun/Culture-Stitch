import { $Enums, Orders } from "@prisma/client";
import { BaseOption } from "./options";

export interface orderSlice {
  orders: Orders[];
  orderLoading: boolean;
}

export interface UpdateOrderPayload extends BaseOption {
  id: string;
  orderStatus: $Enums.Status;
  userId?: string;
  orderDetailIds?: string[];
}
export interface DeleteOrderPayload extends BaseOption {
  id: string;
}
