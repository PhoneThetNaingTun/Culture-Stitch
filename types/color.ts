import { Colors } from "@prisma/client";
import { BaseOption } from "./options";

export interface colorSlice {
  colors: Colors[];
  colorLoading: boolean;
}
export interface NewColorPayload extends BaseOption {
  color: string;
}
export interface UpdateColorPayload extends BaseOption, NewColorPayload {
  id: string;
}
export interface DeleteColorPayload extends BaseOption {
  id: string;
}
