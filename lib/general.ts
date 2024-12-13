"use client";
import { Item } from "@/types/addToCart";
import qs from "query-string";
import { ReadonlyURLSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ProductColors, ProductSizeColors, Products } from "@prisma/client";
import { AddItems } from "@/store/Slices/AddToCartSlice";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/store/hooks";

export const TotalCalc = (
  items: Item[],
  productSizeColors: ProductSizeColors[],
  products: Products[],
  productColors: ProductColors[]
) => {
  const totalPrice = items.reduce((acc, curr) => {
    const productSizeColor = productSizeColors.find(
      (item) => item.id === curr.productSCId
    );
    const productColor = productColors.find(
      (item) => item.id === productSizeColor?.productColorId
    );
    const product = products.find(
      (product) => product.id === productColor?.productId
    );
    const productPrice = product?.price;
    const totalProductPrice = Number(productPrice) * Number(curr.quantity);
    acc += totalProductPrice as number;
    return acc;
  }, 0);
  return totalPrice;
};
export const TotalQuantity = (items: Item[]) => {
  const totalQuantities = items.reduce((acc, curr) => {
    const quantity = curr.quantity;
    acc += quantity;
    return acc;
  }, 0);
  return totalQuantities;
};

export const FindProduct = (
  id: string,
  Key: string,
  router: AppRouterInstance,
  searchParam: ReadonlyURLSearchParams
) => {
  const current = qs.parse(searchParam.toString());
  const query = { ...current, [Key]: id };

  if (current[Key] === id) {
    query[Key] = null;
  }
  const url = qs.stringifyUrl(
    { url: window.location.href, query },
    { skipNull: true }
  );
  router.push(url);
};

//add to cart
