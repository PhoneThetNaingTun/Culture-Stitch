import { ProductCategories } from "@prisma/client";
import { BaseOption } from "./options";

export interface productCategorySlice {
  productCategories: ProductCategories[];
  productCategoryLoading: boolean;
}

export interface NewProductCategoryPayload extends BaseOption {
  categoryName: string;
  categoryTypeId: string;
}
export interface UpdateProductCategoryPayload
  extends BaseOption,
    NewProductCategoryPayload {
  id: string;
}
export interface DeleteProductCategoryPayload extends BaseOption {
  id: string;
}
