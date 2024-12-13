import { Products } from "@prisma/client";
import { BaseOption } from "./options";

export interface productSlice {
  products: Products[];
  productLoading: boolean;
}

export interface NewProductPyaload extends BaseOption {
  name: string;
  productCategoryId: string;
  typeId: string;
  image: string;
  isFeatured?: boolean;
  price: number;
}
export interface UpdateProductPayload extends BaseOption, NewProductPyaload {
  id: string;
}

export interface DeleteProductPayload extends BaseOption {
  id: string;
}
