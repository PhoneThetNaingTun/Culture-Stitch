import {
  DeleteProductColorPayload,
  NewProductColorPayload,
  UpdateProductColorPayload,
  productColorSlice,
} from "@/types/productColor";
import { ProductColors } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: productColorSlice = {
  productColors: [],
  productColorLoading: false,
};
export const CreateProductColor = createAsyncThunk(
  "ProductColorSlice/CreateProductColor",
  async (payload: NewProductColorPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/product-colors`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { newProductColor, message, error } = dataFromServer;
    newProductColor
      ? thunkApi.dispatch(addProductColor(newProductColor))
      : null;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);
export const UpdateProductColor = createAsyncThunk(
  "ProductColorSlice/UpdateProductColor",
  async (payload: UpdateProductColorPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/product-colors`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updatedProductColor, message, error } = dataFromServer;
    updatedProductColor &&
      thunkApi.dispatch(editProductColor(updatedProductColor));
    message && onSuccess && onSuccess(message);
    error && onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);

export const DeleteProductColor = createAsyncThunk(
  "ProductColorSlice/DeleteProductColor",
  async (payload: DeleteProductColorPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { id, onSuccess, onError } = payload;
    const response = await fetch(`/api/dashboard/product-colors`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    message && thunkApi.dispatch(removeProductColor(id));
    thunkApi.dispatch(setLoading(false));
  }
);
const ProductColorSlice = createSlice({
  name: "ProductColorSlice",
  initialState,
  reducers: {
    setProductColors: (state, action: PayloadAction<ProductColors[]>) => {
      state.productColors = action.payload;
    },
    addProductColor: (state, action: PayloadAction<ProductColors>) => {
      state.productColors = [...state.productColors, action.payload];
    },
    editProductColor: (state, action: PayloadAction<ProductColors>) => {
      state.productColors = state.productColors.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeProductColor: (state, action: PayloadAction<string>) => {
      state.productColors = state.productColors.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.productColorLoading = action.payload;
    },
  },
});

export const {
  setLoading,
  setProductColors,
  addProductColor,
  editProductColor,
  removeProductColor,
} = ProductColorSlice.actions;
export default ProductColorSlice.reducer;
