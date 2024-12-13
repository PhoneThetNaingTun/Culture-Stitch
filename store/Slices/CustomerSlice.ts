import { customerSice } from "@/types/customer";
import { User } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: customerSice = {
  customers: [],
  customerLoading: false,
};
const CustomerSlice = createSlice({
  name: "CustomerSlice",
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<User[]>) => {
      state.customers = action.payload;
    },
  },
});

export const { setCustomers } = CustomerSlice.actions;
export default CustomerSlice.reducer;
