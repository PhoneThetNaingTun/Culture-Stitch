"use client";
import { store } from "@/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

interface Prop {
  children: ReactNode;
}

const ReduxProvider = ({ children }: Prop) => {
  return <Provider store={store}>{children}</Provider>;
};
export default ReduxProvider;
