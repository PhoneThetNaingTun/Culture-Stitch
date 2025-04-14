"use client";

import NavBar from "@/components/customerPage/nav";
import { setItems } from "@/store/Slices/AddToCartSlice";
import { fetchCustomerApp } from "@/store/Slices/CustomerAppSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { Item } from "@/types/addToCart";
import CryptoJS from "crypto-js";
import Footer from "@/components/customerPage/footer";
interface Prop {
  children: ReactNode;
}

const layout = ({ children }: Prop) => {
  const { init, user } = useAppSelector((state) => state.CustomerApp);
  const { productSizeColors } = useAppSelector(
    (state) => state.ProductSizeColor
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!init) {
      dispatch(fetchCustomerApp());
    }
  }, [init]);

  useEffect(() => {
    const userId = user.id;
    let guestCart: any = [];
    const guest = Cookies.get("guest");
    if (guest) {
      const bytes = CryptoJS.AES.decrypt(
        guest,
        String(process.env.NEXT_PUBLIC_COOKIE_KEY)
      );
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      guestCart = decryptedData ? JSON.parse(decryptedData) : [];
    }
    if (guestCart.length > 0 && userId) {
      const userCartKey = `atc_${userId}`;
      const encryptedSavedCart = Cookies.get(userCartKey);
      let savedCart: any = [];

      if (encryptedSavedCart) {
        const bytes = CryptoJS.AES.decrypt(
          encryptedSavedCart,
          String(process.env.NEXT_PUBLIC_COOKIE_KEY)
        );
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        savedCart = decryptedData ? JSON.parse(decryptedData) : [];
      }

      const combinedCart = savedCart.map((savedItem: Item) => {
        const matchingGuestItem = guestCart.find(
          (guestItem: Item) => guestItem.productSCId === savedItem.productSCId
        );

        if (matchingGuestItem) {
          const combinedQuantity =
            savedItem.quantity + matchingGuestItem.quantity;

          const productSizeColor = productSizeColors.find(
            (product) => product.id === savedItem.productSCId
          );

          const maxQuantity = productSizeColor ? productSizeColor.quantity : 0;

          return {
            ...savedItem,
            quantity: Math.min(combinedQuantity, maxQuantity),
          };
        } else {
          return savedItem;
        }
      });

      guestCart.forEach((guestItem: Item) => {
        const matchingSavedItem = savedCart.find(
          (savedItem: Item) => savedItem.productSCId === guestItem.productSCId
        );
        if (!matchingSavedItem) {
          const productSizeColor = productSizeColors.find(
            (product) => product.id === guestItem.productSCId
          );
          const maxQuantity = productSizeColor
            ? productSizeColor.quantity
            : Infinity; // Set to Infinity if no match
          combinedCart.push({
            ...guestItem,
            quantity: Math.min(guestItem.quantity, maxQuantity),
          });
        }
      });

      const encryptedCombinedCart = CryptoJS.AES.encrypt(
        JSON.stringify(combinedCart),
        String(process.env.NEXT_PUBLIC_COOKIE_KEY)
      ).toString();

      Cookies.set(userCartKey, encryptedCombinedCart, {
        expires: 7,
        path: "/",
        secure: true,
        sameSite: "Strict",
      });

      dispatch(setItems(combinedCart));
      Cookies.remove("guest", { path: "/" });
    } else if (!userId) {
      let guestCart: any = [];
      const guest = Cookies.get("guest");
      if (guest) {
        // Decrypt the savedCart
        const bytes = CryptoJS.AES.decrypt(
          guest,
          String(process.env.NEXT_PUBLIC_COOKIE_KEY)
        );
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        guestCart = decryptedData ? JSON.parse(decryptedData) : [];
      }
      dispatch(setItems(guestCart));
    } else if (userId) {
      const userCartKey = `atc_${userId}`;
      const encryptedSavedCart = Cookies.get(userCartKey);
      let savedCart = [];

      if (encryptedSavedCart) {
        // Decrypt the savedCart
        const bytes = CryptoJS.AES.decrypt(
          encryptedSavedCart,
          String(process.env.NEXT_PUBLIC_COOKIE_KEY)
        );
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        savedCart = decryptedData ? JSON.parse(decryptedData) : [];
      }

      dispatch(setItems(savedCart));
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center mt-10">{children}</div>
      <Footer />
    </>
  );
};

export default layout;
