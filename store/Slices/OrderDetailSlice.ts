import { orderDetailSlice } from "@/types/orderDetail";
import { OrderDetails } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: orderDetailSlice = {
  orderDetails: [],
  orderDetailLoading: false,
};
const OrderDetailSlice = createSlice({
  name: "OrderDetailSlice",
  initialState,
  reducers: {
    setOrderDetails: (state, action: PayloadAction<OrderDetails[]>) => {
      state.orderDetails = action.payload;
    },
    addOrderDetail: (state, action: PayloadAction<OrderDetails>) => {
      state.orderDetails = [...state.orderDetails, action.payload];
    },
    editOrderDetail: (state, action: PayloadAction<OrderDetails>) => {
      state.orderDetails = state.orderDetails.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeOrderDetail: (state, action: PayloadAction<string>) => {
      state.orderDetails = state.orderDetails.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.orderDetailLoading = action.payload;
    },
  },
});

export const {
  setLoading,
  setOrderDetails,
  addOrderDetail,
  editOrderDetail,
  removeOrderDetail,
} = OrderDetailSlice.actions;
export default OrderDetailSlice.reducer;
