import { ProductCategoryTypes } from "@prisma/client";
import { BaseOption } from "./options";

export interface categoryTypeSlice {
  categoryTypes: ProductCategoryTypes[];
  categoryTypeLoading: boolean;
}
export interface NewCategoryTypePayload extends BaseOption {
  categroyTypeName: string;
}
export interface UpdateCategoryTypePayload
  extends BaseOption,
    NewCategoryTypePayload {
  id: string;
}
export interface DeleteCategoryTypePayload extends BaseOption {
  id: string;
}
