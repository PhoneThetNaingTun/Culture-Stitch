import {
  DeleteProductPayload,
  NewProductPyaload,
  UpdateProductPayload,
  productSlice,
} from "@/types/product";
import { NewSizePayload } from "@/types/size";
import { Products } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: productSlice = {
  products: [],
  productLoading: false,
};
export const CreateProduct = createAsyncThunk(
  "ProductSlice/CreateProduct",
  async (payload: NewProductPyaload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/products`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { newProduct, message, error } = dataFromServer;
    newProduct ? thunkApi.dispatch(addProduct(newProduct)) : null;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);
export const UpdateProduct = createAsyncThunk(
  "ProductSlice/UpdateProduct",
  async (payload: UpdateProductPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/products`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updatedProduct, message, error } = dataFromServer;
    updatedProduct && thunkApi.dispatch(editProduct(updatedProduct));
    message && onSuccess && onSuccess(message);
    error && onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);

export const DeleteProduct = createAsyncThunk(
  "ProductSlice/DeleteProduct",
  async (payload: DeleteProductPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { id, onSuccess, onError } = payload;
    const response = await fetch(`/api/dashboard/products`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    message && thunkApi.dispatch(removeProduct(id));
    thunkApi.dispatch(setLoading(false));
  }
);
const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Products[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Products>) => {
      state.products = [...state.products, action.payload];
    },
    editProduct: (state, action: PayloadAction<Products>) => {
      state.products = state.products.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.productLoading = action.payload;
    },
  },
});

export const {
  setProducts,
  addProduct,
  editProduct,
  removeProduct,
  setLoading,
} = ProductSlice.actions;
export default ProductSlice.reducer;
