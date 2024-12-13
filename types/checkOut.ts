import { $Enums } from "@prisma/client";
import { BaseOption } from "./options";

export type CartItems = {
  productSCId: string | undefined;
  quantity: number;
};

export interface OrderCheckOut {
  userId: string;
  name: string;
  phone: string;
  address: string;
  productSCIds: CartItems[];
  city: string;
  state: string;
}

export interface checkOutSlice {
  checkOut: OrderCheckOut[];
  checkOutLoading: boolean;
}

export interface NewCheckOutPayload extends BaseOption, OrderCheckOut {}
