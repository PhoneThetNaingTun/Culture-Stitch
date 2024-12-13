import { orderConfirmSlice } from "@/types/orderConfirms";
import { OrderConfirm } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: orderConfirmSlice = {
  orderConfirms: [],
  orderConfirmLoaindg: false,
};
const OrderConfirmSlice = createSlice({
  name: "OrderConfirmSlice",
  initialState,
  reducers: {
    setOrderConfirms: (state, action: PayloadAction<OrderConfirm[]>) => {
      state.orderConfirms = action.payload;
    },
  },
});

export const { setOrderConfirms } = OrderConfirmSlice.actions;
export default OrderConfirmSlice.reducer;
