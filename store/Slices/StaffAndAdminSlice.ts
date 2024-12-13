import { staffAndAdminsSlice } from "@/types/staffAndAdmin";
import { User } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: staffAndAdminsSlice = {
  staffAndAdmins: [],
  staffAndAdminLoading: false,
};
const StaffAndAdminSlice = createSlice({
  name: "StaffAndAdminSlice",
  initialState,
  reducers: {
    setStaffAndAdmin: (state, action: PayloadAction<User[]>) => {
      state.staffAndAdmins = action.payload;
    },
  },
});

export const { setStaffAndAdmin } = StaffAndAdminSlice.actions;
export default StaffAndAdminSlice.reducer;
