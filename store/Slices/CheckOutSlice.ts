import {
  NewCheckOutPayload,
  OrderCheckOut,
  checkOutSlice,
} from "@/types/checkOut";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setUser } from "./CustomerAppSlice";
import { addOrderDetail } from "./OrderDetailSlice";
import { addOrder } from "./OrderSlice";

const initialState: checkOutSlice = {
  checkOut: [],
  checkOutLoading: false,
};

export const CreateCheckOut = createAsyncThunk(
  "CheckOutSlice/CreateCkeckOut",
  async (payload: NewCheckOutPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/customer/checkout`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { newOrder, newOrderDetails, updatedUser, message, error } =
      dataFromServer;
    updatedUser ? thunkApi.dispatch(setUser(updatedUser)) : null;
    newOrder ? thunkApi.dispatch(addOrder(newOrder)) : null;
    newOrderDetails ? thunkApi.dispatch(addOrderDetail(newOrderDetails)) : null;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);

const CheckOutSlice = createSlice({
  name: "CheckOutSlice",
  initialState,
  reducers: {
    setCheckOut: (state, action: PayloadAction<OrderCheckOut[]>) => {
      state.checkOut = action.payload;
    },
    addCheckOut: (state, action: PayloadAction<OrderCheckOut>) => {
      state.checkOut = [...state.checkOut, action.payload];
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.checkOutLoading = action.payload;
    },
  },
});

export const { setCheckOut, addCheckOut, setLoading } = CheckOutSlice.actions;
export default CheckOutSlice.reducer;
