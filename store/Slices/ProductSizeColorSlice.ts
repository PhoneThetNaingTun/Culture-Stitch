import {
  DeleteProductSizeColorPayload,
  NewProductSizeColorPayload,
  UpdateProductSizeColorPayload,
  productSizeColorSlice,
} from "@/types/productSizeColor";
import { ProductSizeColors } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: productSizeColorSlice = {
  productSizeColors: [],
  productSizeColorLoading: false,
};

export const CreateProductSizeColor = createAsyncThunk(
  "ProductSizeColorSlice/CreateProductSizeColor",
  async (payload: NewProductSizeColorPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/product-size-colors`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { newProductSizeColor, message, error } = dataFromServer;
    newProductSizeColor
      ? thunkApi.dispatch(addProductSizeColor(newProductSizeColor))
      : null;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);
export const UpdateProductSizeColor = createAsyncThunk(
  "ProductSizeColorSlice/UpdateProductSizeColor",
  async (payload: UpdateProductSizeColorPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/product-size-colors`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updatedProductSizeColor, message, error } = dataFromServer;
    updatedProductSizeColor &&
      thunkApi.dispatch(editProductSizeColor(updatedProductSizeColor));
    message && onSuccess && onSuccess(message);
    error && onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);

export const DeleteProductSizeColor = createAsyncThunk(
  "ProductSizeColorSlice/DeleteProductSizeColor",
  async (payload: DeleteProductSizeColorPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { id, onSuccess, onError } = payload;
    const response = await fetch(`/api/dashboard/product-size-colors`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    message && thunkApi.dispatch(removeProductSizeColor(id));
    thunkApi.dispatch(setLoading(false));
  }
);

const ProductSizeColorSlice = createSlice({
  name: "ProductSizeColorSlice",
  initialState,
  reducers: {
    setProductSizeColors: (
      state,
      action: PayloadAction<ProductSizeColors[]>
    ) => {
      state.productSizeColors = action.payload;
    },
    addProductSizeColor: (state, action: PayloadAction<ProductSizeColors>) => {
      state.productSizeColors = [...state.productSizeColors, action.payload];
    },
    editProductSizeColor: (state, action: PayloadAction<ProductSizeColors>) => {
      state.productSizeColors = state.productSizeColors.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeProductSizeColor: (state, action: PayloadAction<string>) => {
      state.productSizeColors = state.productSizeColors.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.productSizeColorLoading = action.payload;
    },
  },
});

export const {
  setProductSizeColors,
  addProductSizeColor,
  editProductSizeColor,
  removeProductSizeColor,
  setLoading,
} = ProductSizeColorSlice.actions;
export default ProductSizeColorSlice.reducer;
