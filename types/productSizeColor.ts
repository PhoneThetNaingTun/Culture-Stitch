import { ProductSizeColors } from "@prisma/client";
import { BaseOption } from "./options";

export interface productSizeColorSlice {
  productSizeColors: ProductSizeColors[];
  productSizeColorLoading: boolean;
}

export interface NewProductSizeColorPayload extends BaseOption {
  productColorId: string;
  sizeId: string;
  quantity: number;
}
export interface UpdateProductSizeColorPayload
  extends BaseOption,
    NewProductSizeColorPayload {
  id: string;
}
export interface DeleteProductSizeColorPayload extends BaseOption {
  id: string;
}
