import { NewReviewPayload, reviewSlice } from "@/types/review";
import { Reviews } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: reviewSlice = {
  reviews: [],
  reviewLoading: false,
};

export const CreateReview = createAsyncThunk(
  "SizeSlice/CreateReview",
  async (payload: NewReviewPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/customer/reviews`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);

const ReviewSlcie = createSlice({
  name: "ReviewSlcie",
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<Reviews[]>) => {
      state.reviews = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.reviewLoading = action.payload;
    },
  },
});

export const { setLoading, setReviews } = ReviewSlcie.actions;
export default ReviewSlcie.reducer;
