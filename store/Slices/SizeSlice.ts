import {
  DeleteSizePayload,
  NewSizePayload,
  UpdateSizePayload,
  sizeSlice,
} from "@/types/size";
import { Sizes } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: sizeSlice = {
  sizes: [],
  sizeLoading: false,
};
export const CreateSize = createAsyncThunk(
  "SizeSlice/CreateSize",
  async (payload: NewSizePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/sizes`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { newSize, message, error } = dataFromServer;
    newSize ? thunkApi.dispatch(addSize(newSize)) : null;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);
export const UpdateSize = createAsyncThunk(
  "SizeSlice/UpdateSize",
  async (payload: UpdateSizePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/sizes`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updatedSize, message, error } = dataFromServer;
    updatedSize && thunkApi.dispatch(editSize(updatedSize));
    message && onSuccess && onSuccess(message);
    error && onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);

export const DeleteSize = createAsyncThunk(
  "SizeSlice/DeleteSize",
  async (payload: DeleteSizePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { id, onSuccess, onError } = payload;
    const response = await fetch(`/api/dashboard/sizes`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    message && thunkApi.dispatch(removeSize(id));
    thunkApi.dispatch(setLoading(false));
  }
);
const SizeSlice = createSlice({
  name: "SizeSlice",
  initialState,
  reducers: {
    setSizes: (state, action: PayloadAction<Sizes[]>) => {
      state.sizes = action.payload;
    },
    addSize: (state, action: PayloadAction<Sizes>) => {
      state.sizes = [...state.sizes, action.payload];
    },
    editSize: (state, action: PayloadAction<Sizes>) => {
      state.sizes = state.sizes.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeSize: (state, action: PayloadAction<string>) => {
      state.sizes = state.sizes.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.sizeLoading = action.payload;
    },
  },
});

export const { setLoading, setSizes, addSize, editSize, removeSize } =
  SizeSlice.actions;
export default SizeSlice.reducer;
