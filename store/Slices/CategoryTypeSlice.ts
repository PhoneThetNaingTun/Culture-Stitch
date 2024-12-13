import {
  DeleteCategoryTypePayload,
  NewCategoryTypePayload,
  UpdateCategoryTypePayload,
  categoryTypeSlice,
} from "@/types/categoryTypes";
import { ProductCategoryTypes } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: categoryTypeSlice = {
  categoryTypes: [],
  categoryTypeLoading: false,
};
export const CreateCategoryType = createAsyncThunk(
  "CategoryTypeSlice/CreateCategoryType",
  async (payload: NewCategoryTypePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/category-types`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { newCategoryType, message, error } = dataFromServer;
    newCategoryType
      ? thunkApi.dispatch(addCategoryType(newCategoryType))
      : null;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);
export const UpdateCategoryType = createAsyncThunk(
  "CategoryTypeSlice/UpdateCategoryType",
  async (payload: UpdateCategoryTypePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/category-types`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updatedCategoryType, message, error } = dataFromServer;
    updatedCategoryType &&
      thunkApi.dispatch(editCategoryType(updatedCategoryType));
    message && onSuccess && onSuccess(message);
    error && onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);

export const DeleteCategoryType = createAsyncThunk(
  "CategoryTypeSlice/DeleteCategoryType",
  async (payload: DeleteCategoryTypePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { id, onSuccess, onError } = payload;
    const response = await fetch(`/api/dashboard/category-types`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    message && thunkApi.dispatch(removeCategoryType(id));
    thunkApi.dispatch(setLoading(false));
  }
);
const CategoryTypeSlice = createSlice({
  name: "CategoryTypeSlice",
  initialState,
  reducers: {
    setCategoryTypes: (
      state,
      action: PayloadAction<ProductCategoryTypes[]>
    ) => {
      state.categoryTypes = action.payload;
    },
    addCategoryType: (state, action: PayloadAction<ProductCategoryTypes>) => {
      state.categoryTypes = [...state.categoryTypes, action.payload];
    },
    editCategoryType: (state, action: PayloadAction<ProductCategoryTypes>) => {
      state.categoryTypes = state.categoryTypes.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeCategoryType: (state, action: PayloadAction<string>) => {
      state.categoryTypes = state.categoryTypes.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.categoryTypeLoading = action.payload;
    },
  },
});

export const {
  setCategoryTypes,
  addCategoryType,
  editCategoryType,
  removeCategoryType,
  setLoading,
} = CategoryTypeSlice.actions;
export default CategoryTypeSlice.reducer;
