import { User } from "@prisma/client";
import { BaseOption } from "./options";

export interface customerAppSlice {
  user: User;
  customerAppSliceLoading: boolean;
  init: boolean;
}
export interface EditUserPayload extends BaseOption {
  name: string | null;
  id: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
}
