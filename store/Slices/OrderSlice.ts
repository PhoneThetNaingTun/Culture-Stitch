import { DeleteOrderDetailPayload } from "@/types/orderDetail";
import { UpdateOrderPayload, orderSlice } from "@/types/orders";
import { Orders } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setProductSizeColors } from "./ProductSizeColorSlice";

const initialState: orderSlice = {
  orders: [],
  orderLoading: false,
};
export const UpdateOrder = createAsyncThunk(
  "OrderSlice/UpdateOrder",
  async (payload: UpdateOrderPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/order`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updatedOrder, message, error, productSizeColors } = dataFromServer;
    updatedOrder && thunkApi.dispatch(editOrder(updatedOrder));
    productSizeColors &&
      thunkApi.dispatch(setProductSizeColors(productSizeColors));
    message && onSuccess && onSuccess(message);
    error && onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);
export const DeleteOrder = createAsyncThunk(
  "OrderSlice/DeleteOrder",
  async (payload: DeleteOrderDetailPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { id, onSuccess, onError } = payload;
    const response = await fetch(`/api/dashboard/order`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    message && thunkApi.dispatch(removeOrder(id));
    thunkApi.dispatch(setLoading(false));
  }
);
const OrderSlice = createSlice({
  name: "OrderSlice",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Orders[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Orders>) => {
      state.orders = [...state.orders, action.payload];
    },
    editOrder: (state, action: PayloadAction<Orders>) => {
      state.orders = state.orders.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.orderLoading = action.payload;
    },
  },
});

export const { setOrders, setLoading, editOrder, removeOrder, addOrder } =
  OrderSlice.actions;
export default OrderSlice.reducer;
