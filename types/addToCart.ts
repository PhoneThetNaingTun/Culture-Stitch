import { BaseOption } from "./options";

export interface Item extends BaseOption {
  productSCId?: string;
  quantity: number;
}

export interface addToCartSlice {
  items: Item[];
  addToCartLoading: boolean;
}
