import { Item, addToCartSlice } from "@/types/addToCart";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: addToCartSlice = {
  items: [],
  addToCartLoading: false,
};

export const AddItems = createAsyncThunk(
  "AddToCartSlice/AddItems",
  async (payload: Item, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    onSuccess && onSuccess("Item added to cart!");
    onError && onError("Error Occured");
    thunkApi.dispatch(addItem(payload));
    thunkApi.dispatch(setLoading(false));
  }
);
export const IncreaseItemQuantity = createAsyncThunk(
  "AddToCartSlice/IncreaseItemQuantity",
  async (payload: Item, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    thunkApi.dispatch(editItem(payload));
    thunkApi.dispatch(setLoading(false));
  }
);
export const DecreaseItemQuantity = createAsyncThunk(
  "AddToCartSlice/DecreaseItemQuantity",
  async (payload: Item, thunkApi) => {
    thunkApi.dispatch(setLoading(true));

    thunkApi.dispatch(editItem(payload));
    thunkApi.dispatch(setLoading(false));
  }
);

const AddToCartSlice = createSlice({
  name: "AddToCartSlice",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<Item>) => {
      state.items = [...state.items, action.payload];
    },
    editItem: (state, action: PayloadAction<Item>) => {
      state.items = state.items.map((item) =>
        item.productSCId === action.payload.productSCId ? action.payload : item
      );
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) =>
        item.productSCId === action.payload ? false : true
      );
    },
    clearItems: (state) => {
      state.items = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.addToCartLoading = action.payload;
    },
  },
});

export const {
  addItem,
  editItem,
  removeItem,
  setLoading,
  setItems,
  clearItems,
} = AddToCartSlice.actions;
export default AddToCartSlice.reducer;
