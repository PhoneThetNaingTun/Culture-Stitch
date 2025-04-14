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
import { EditUserPayload, customerAppSlice } from "@/types/customerApp";
import { setCategoryTypes } from "./CategoryTypeSlice";
import { setOrders } from "./OrderSlice";
import { setOrderDetails } from "./OrderDetailSlice";
import { setOrderConfirms } from "./OrderConfirmSlice";
import { setReviews } from "./ReviewSlice";

const initialState: customerAppSlice = {
  //@ts-ignore
  user: {},
  customerAppSliceLoading: true,
  init: false,
};

export const fetchCustomerApp = createAsyncThunk(
  "CustomerAppSlice/fetchCustomerdApp",
  async (_, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const response = await fetch(`/api/customer/app`, { method: "GET" });
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
      orderConfirms,
      reviews,
    } = dataFromServer;
    thunkApi.dispatch(setUser(user));
    thunkApi.dispatch(setBoard(boards));
    thunkApi.dispatch(setOrders(orders));
    thunkApi.dispatch(setTypes(types));
    thunkApi.dispatch(setColors(colors));
    thunkApi.dispatch(setReviews(reviews));
    thunkApi.dispatch(setProducts(products));
    thunkApi.dispatch(setOrderDetails(orderDetails));
    thunkApi.dispatch(setOrderConfirms(orderConfirms));
    thunkApi.dispatch(setSizes(sizes));
    thunkApi.dispatch(setProductColors(productColors));
    thunkApi.dispatch(setProductSizeColors(productSizeColors));
    thunkApi.dispatch(setCategoryTypes(productCategoryTypes));
    thunkApi.dispatch(setStaffAndAdmin(staffAndAdmins));
    thunkApi.dispatch(setProductCategories(productCategories));
    thunkApi.dispatch(setLoading(false));
    thunkApi.dispatch(setInit(true));
  }
);

export const EditUser = createAsyncThunk(
  "CustomerAppSlice/EditUser",
  async (payload: EditUserPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/customer/user`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { user, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    message ? thunkApi.dispatch(setUser(user)) : "";
    thunkApi.dispatch(setLoading(false));
  }
);

const CustomerAppSlice = createSlice({
  name: "CustomerAppSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.customerAppSliceLoading = action.payload;
    },
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
  },
});

export const { setUser, setLoading, setInit } = CustomerAppSlice.actions;
export default CustomerAppSlice.reducer;
