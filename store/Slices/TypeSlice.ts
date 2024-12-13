import {
  DeleteTypePayload,
  NewTypePayload,
  UpdateTypePayload,
  typeSLice,
} from "@/types/type";
import { Types } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: typeSLice = {
  types: [],
  typeLoading: false,
};

export const CreateType = createAsyncThunk(
  "TypeSlice/CreateType",
  async (payload: NewTypePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/types`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { newType, message, error } = dataFromServer;
    newType ? thunkApi.dispatch(addType(newType)) : null;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);
export const UpdateType = createAsyncThunk(
  "TypeSlice/UpdateType",
  async (payload: UpdateTypePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/types`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updatedType, message, error } = dataFromServer;
    updatedType && thunkApi.dispatch(editType(updatedType));
    message && onSuccess && onSuccess(message);
    error && onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);

export const DeleteType = createAsyncThunk(
  "TypeSlice/DeleteType",
  async (payload: DeleteTypePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { id, onSuccess, onError } = payload;
    const response = await fetch(`/api/dashboard/types`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    message && thunkApi.dispatch(removeType(id));
    thunkApi.dispatch(setLoading(false));
  }
);

const TypeSlice = createSlice({
  name: "TypeSlice",
  initialState,
  reducers: {
    setTypes: (state, action: PayloadAction<Types[]>) => {
      state.types = action.payload;
    },
    addType: (state, action: PayloadAction<Types>) => {
      state.types = [...state.types, action.payload];
    },
    editType: (state, action: PayloadAction<Types>) => {
      state.types = state.types.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeType: (state, action: PayloadAction<string>) => {
      state.types = state.types.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.typeLoading = action.payload;
    },
  },
});

export const { setTypes, addType, editType, removeType, setLoading } =
  TypeSlice.actions;
export default TypeSlice.reducer;
