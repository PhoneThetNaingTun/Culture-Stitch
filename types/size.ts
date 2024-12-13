import { Sizes } from "@prisma/client";
import { BaseOption } from "./options";

export interface sizeSlice {
  sizes: Sizes[];
  sizeLoading: boolean;
}

export interface NewSizePayload extends BaseOption {
  size: string;
}

export interface UpdateSizePayload extends BaseOption, NewSizePayload {
  id: string;
}
export interface DeleteSizePayload extends BaseOption {
  id: string;
}
