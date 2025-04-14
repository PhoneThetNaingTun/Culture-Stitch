import { ImageUploadPayload, dashBoardAppSlice } from "@/types/dashboardapp";
import { User } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setBoard } from "./BoardSlice";
import { setStaffAndAdmin } from "./StaffAndAdminSlice";
import { setProductCategories } from "./ProductCategorySlice";
import { setTypes } from "./TypeSlice";
import { setColors } from "./ColorSlice";
import { setSizes } from "./SizeSlice";
import { setProducts } from "./ProductSlice";
import { setProductColors } from "./ProductColorSlice";
import { setProductSizeColors } from "./ProductSizeColorSlice";
import { setCategoryTypes } from "./CategoryTypeSlice";
import { setOrders } from "./OrderSlice";
import { setOrderDetails } from "./OrderDetailSlice";
import { setCustomers } from "./CustomerSlice";
import { setOrderConfirms } from "./OrderConfirmSlice";
import { setReviews } from "./ReviewSlice";

const initialState: dashBoardAppSlice = {
  user: {},
  dashboardAppSliceLoading: true,
  init: false,
  imageUploadLoading: false,
};

export const fetchDashBoardApp = createAsyncThunk(
  "DashBoardAppSlice/fetchDashBoardApp",
  async (_, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const response = await fetch(`/api/dashboard/app`, { method: "GET" });
    const dataFromServer = await response.json();
    const {
      user,
      boards,
      staffAndAdmins,
      productCategories,
      types,
      colors,
      sizes,
      products,
      productColors,
      productSizeColors,
      productCategoryTypes,
      orders,
      orderDetails,
      customers,
      orderConfirms,
      reviews,
    } = dataFromServer;
    thunkApi.dispatch(setUser(user));
    thunkApi.dispatch(setOrders(orders));
    thunkApi.dispatch(setBoard(boards));
    thunkApi.dispatch(setSizes(sizes));
    thunkApi.dispatch(setTypes(types));
    thunkApi.dispatch(setColors(colors));
    thunkApi.dispatch(setReviews(reviews));
    thunkApi.dispatch(setProducts(products));
    thunkApi.dispatch(setCustomers(customers));
    thunkApi.dispatch(setOrderDetails(orderDetails));
    thunkApi.dispatch(setProductColors(productColors));
    thunkApi.dispatch(setOrderConfirms(orderConfirms));
    thunkApi.dispatch(setProductSizeColors(productSizeColors));
    thunkApi.dispatch(setCategoryTypes(productCategoryTypes));
    thunkApi.dispatch(setStaffAndAdmin(staffAndAdmins));
    thunkApi.dispatch(setProductCategories(productCategories));
    thunkApi.dispatch(setLoading(false));
    thunkApi.dispatch(setInit(true));
  }
);

export const assetUpload = createAsyncThunk(
  "DashBoardAppSlice/assetUpload",
  async (payload: ImageUploadPayload, thunkApi) => {
    thunkApi.dispatch(setImgLoading(true));
    const { file, onSuccess, onError } = payload;
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`/api/dashboard/asset`, {
      method: "POST",
      body: formData,
    });
    const dataFromServer = await response.json();
    const { imageName, error } = dataFromServer;
    error ? onError && onError(error) : onSuccess && onSuccess(imageName);
    thunkApi.dispatch(setImgLoading(false));
  }
);
export const assetProductUpload = createAsyncThunk(
  "DashBoardAppSlice/assetProductUpload",
  async (payload: ImageUploadPayload, thunkApi) => {
    thunkApi.dispatch(setImgLoading(true));
    const { file, onSuccess, onError } = payload;
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`/api/dashboard/assetProduct`, {
      method: "POST",
      body: formData,
    });
    const dataFromServer = await response.json();
    const { imageName, error } = dataFromServer;
    error ? onError && onError(error) : onSuccess && onSuccess(imageName);
    thunkApi.dispatch(setImgLoading(false));
  }
);

const DashBoardAppSlice = createSlice({
  name: "DashBoardAppSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.dashboardAppSliceLoading = action.payload;
    },
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
    setImgLoading: (state, action: PayloadAction<boolean>) => {
      state.imageUploadLoading = action.payload;
    },
  },
});

export const { setUser, setLoading, setInit, setImgLoading } =
  DashBoardAppSlice.actions;
export default DashBoardAppSlice.reducer;
