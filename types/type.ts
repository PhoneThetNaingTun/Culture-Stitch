import { Types } from "@prisma/client";
import { BaseOption } from "./options";

export interface typeSLice {
  types: Types[];
  typeLoading: boolean;
}

export interface NewTypePayload extends BaseOption {
  type: string;
}
export interface UpdateTypePayload extends BaseOption, NewTypePayload {
  id: string;
}

export interface DeleteTypePayload extends BaseOption {
  id: string;
}
