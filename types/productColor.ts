import { ProductColors } from "@prisma/client";
import { BaseOption } from "./options";

export interface productColorSlice {
  productColors: ProductColors[];
  productColorLoading: boolean;
}
export interface NewProductColorPayload extends BaseOption {
  productId: string;
  colorId: string;
  image: string;
}
export interface UpdateProductColorPayload
  extends BaseOption,
    NewProductColorPayload {
  id: string;
}

export interface DeleteProductColorPayload extends BaseOption {
  id: string;
}
