import { OrderConfirm } from "@prisma/client";

export interface orderConfirmSlice {
  orderConfirms: OrderConfirm[];
  orderConfirmLoaindg: boolean;
}
