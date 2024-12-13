import {
  DeleteProductCategoryPayload,
  NewProductCategoryPayload,
  UpdateProductCategoryPayload,
  productCategorySlice,
} from "@/types/productCategory";
import { ProductCategories } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: productCategorySlice = {
  productCategories: [],
  productCategoryLoading: false,
};

export const CreateProductCategory = createAsyncThunk(
  "ProductCategorySlice/CreateProductCategory",
  async (payload: NewProductCategoryPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/product-categories`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { newProdcutCategory, message, error } = dataFromServer;
    newProdcutCategory
      ? thunkApi.dispatch(addProductCategroy(newProdcutCategory))
      : null;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);
export const UpdatePrdocutCategory = createAsyncThunk(
  "ProductCategorySlice/UpdatePrdocutCategory",
  async (payload: UpdateProductCategoryPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/product-categories`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updatedProductCategory, message, error } = dataFromServer;
    updatedProductCategory &&
      thunkApi.dispatch(editProductCategory(updatedProductCategory));
    message && onSuccess && onSuccess(message);
    error && onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);

export const DeleteProductCategory = createAsyncThunk(
  "ProductCategorySlice/DeleteProductCategory",
  async (payload: DeleteProductCategoryPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { id, onSuccess, onError } = payload;
    const response = await fetch(`/api/dashboard/product-categories`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    message && thunkApi.dispatch(removeProductCategory(id));
    thunkApi.dispatch(setLoading(false));
  }
);

const ProductCategorySlice = createSlice({
  name: "ProductCategorySlice",
  initialState,
  reducers: {
    setProductCategories: (
      state,
      action: PayloadAction<ProductCategories[]>
    ) => {
      state.productCategories = action.payload;
    },
    addProductCategroy: (state, action: PayloadAction<ProductCategories>) => {
      state.productCategories = [...state.productCategories, action.payload];
    },
    editProductCategory: (state, action: PayloadAction<ProductCategories>) => {
      state.productCategories = state.productCategories.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeProductCategory: (state, action: PayloadAction<string>) => {
      state.productCategories = state.productCategories.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.productCategoryLoading = action.payload;
    },
  },
});

export const {
  setLoading,
  addProductCategroy,
  setProductCategories,
  removeProductCategory,
  editProductCategory,
} = ProductCategorySlice.actions;
export default ProductCategorySlice.reducer;
