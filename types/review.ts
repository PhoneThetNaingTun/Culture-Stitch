import { Reviews } from "@prisma/client";
import { BaseOption } from "./options";

export interface reviewSlice {
  reviews: Reviews[];
  reviewLoading: boolean;
}

export interface NewReviewPayload extends BaseOption {
  review: string;
  userId: string;
}
