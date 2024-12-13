import { User } from "@prisma/client";
import { BaseOption } from "./options";

export interface dashBoardAppSlice {
  user: User | any;
  dashboardAppSliceLoading: boolean;
  init: boolean;
  imageUploadLoading: boolean;
}
export interface ImageUploadPayload extends BaseOption {
  file: File;
}
