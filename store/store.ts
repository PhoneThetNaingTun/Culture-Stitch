import { configureStore } from "@reduxjs/toolkit";

import BoardSliceReducer from "./Slices/BoardSlice";
import DashBoardAppSliceReducer from "./Slices/DashBoardAppSlice";
import CustomerAppSliceReducer from "./Slices/CustomerAppSlice";
import StaffAndAdminSliceReducer from "./Slices/StaffAndAdminSlice";
import ProductCategorySliceReducer from "./Slices/ProductCategorySlice";
import ProductCategoryTypeSliceReducer from "./Slices/CategoryTypeSlice";
import ProductTypeSliceReducer from "./Slices/TypeSlice";
import ColorSliceReducer from "./Slices/ColorSlice";
import SizeSliceReducer from "./Slices/SizeSlice";
import ProductSliceReducer from "./Slices/ProductSlice";
import ProductColorSliceReducer from "./Slices/ProductColorSlice";
import ProductSizeColorSliceReducer from "./Slices/ProductSizeColorSlice";
import OrderDetailSliceReducer from "./Slices/OrderDetailSlice";
import AddToCartSliceReducer from "./Slices/AddToCartSlice";
import CheckOutSliceReducer from "./Slices/CheckOutSlice";
import OrderSliceReducer from "./Slices/OrderSlice";
import CustomerSliceReducer from "./Slices/CustomerSlice";
import OrderConfirmSliceReducer from "./Slices/OrderConfirmSlice";
import ReviewSliceReducer from "./Slices/ReviewSlice";

export const store = configureStore({
  reducer: {
    Boards: BoardSliceReducer,
    DashBoardApp: DashBoardAppSliceReducer,
    CustomerApp: CustomerAppSliceReducer,
    StaffAndAdmin: StaffAndAdminSliceReducer,
    ProductCategory: ProductCategorySliceReducer,
    ProductType: ProductTypeSliceReducer,
    Color: ColorSliceReducer,
    Size: SizeSliceReducer,
    Product: ProductSliceReducer,
    ProductColor: ProductColorSliceReducer,
    ProductSizeColor: ProductSizeColorSliceReducer,
    CategoryType: ProductCategoryTypeSliceReducer,
    OrderDetails: OrderDetailSliceReducer,
    AddToCart: AddToCartSliceReducer,
    CheckOut: CheckOutSliceReducer,
    Order: OrderSliceReducer,
    Customer: CustomerSliceReducer,
    OrderConfirm: OrderConfirmSliceReducer,
    Review: ReviewSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
