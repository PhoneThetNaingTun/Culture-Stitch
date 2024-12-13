import { Board } from "@prisma/client";
import { BaseOption } from "./options";

export interface boardSlice {
  boards: Board[];
  boardLoading: boolean;
}

export interface NewBoardPayload extends BaseOption {
  label: string;
  image: string;
  userId: string;
}

export interface UpdateBoardPayload extends BaseOption, NewBoardPayload {
  id: string;
  onDisplay?: boolean;
}

export interface DeleteBoardPayload extends BaseOption {
  id: string;
}
