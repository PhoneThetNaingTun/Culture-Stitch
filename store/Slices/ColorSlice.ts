import {
  DeleteColorPayload,
  NewColorPayload,
  UpdateColorPayload,
  colorSlice,
} from "@/types/color";
import { Colors } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: colorSlice = {
  colors: [],
  colorLoading: false,
};
export const CreateColor = createAsyncThunk(
  "ColorSlice/CreateColor",
  async (payload: NewColorPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/colors`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { newColor, message, error } = dataFromServer;
    newColor ? thunkApi.dispatch(addColor(newColor)) : null;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);
export const UpdateColor = createAsyncThunk(
  "ColorSlice/UpdateColor",
  async (payload: UpdateColorPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/colors`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updatedColor, message, error } = dataFromServer;
    updatedColor && thunkApi.dispatch(editColor(updatedColor));
    message && onSuccess && onSuccess(message);
    error && onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);

export const DeleteColor = createAsyncThunk(
  "ColorSlice/DeleteColor",
  async (payload: DeleteColorPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { id, onSuccess, onError } = payload;
    const response = await fetch(`/api/dashboard/colors`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    message && thunkApi.dispatch(removeColor(id));
    thunkApi.dispatch(setLoading(false));
  }
);
const ColorSlice = createSlice({
  name: "ColorSlice",
  initialState,
  reducers: {
    setColors: (state, action: PayloadAction<Colors[]>) => {
      state.colors = action.payload;
    },
    addColor: (state, action: PayloadAction<Colors>) => {
      state.colors = [...state.colors, action.payload];
    },
    editColor: (state, action: PayloadAction<Colors>) => {
      state.colors = state.colors.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeColor: (state, action: PayloadAction<string>) => {
      state.colors = state.colors.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.colorLoading = action.payload;
    },
  },
});

export const { setColors, addColor, removeColor, editColor, setLoading } =
  ColorSlice.actions;
export default ColorSlice.reducer;
