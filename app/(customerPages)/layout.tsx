"use client";
import Footer from "@/components/customerPage/footer";
import NavBar from "@/components/customerPage/nav";
import { setItems } from "@/store/Slices/AddToCartSlice";
import { fetchCustomerApp } from "@/store/Slices/CustomerAppSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { Item } from "@/types/addToCart";
import CryptoJS from "crypto-js";

interface Prop {
  children: React.ReactNode;
}

const CustomerPageLayout = ({ children }: Prop) => {
  const { init, customerAppSliceLoading, user } = useAppSelector(
    (state) => state.CustomerApp
  );
  const { productSizeColors } = useAppSelector(
    (state) => state.ProductSizeColor
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCustomerApp());
  }, []);

  useEffect(() => {
    const userId = user.id;
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
    if (guestCart.length > 0 && userId) {
      const userCartKey = `atc_${userId}`;
      const encryptedSavedCart = Cookies.get(userCartKey);
      let savedCart: any = [];

      if (encryptedSavedCart) {
        // Decrypt the savedCart
        const bytes = CryptoJS.AES.decrypt(
          encryptedSavedCart,
          String(process.env.NEXT_PUBLIC_COOKIE_KEY)
        );
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        savedCart = decryptedData ? JSON.parse(decryptedData) : [];
      }

      const combinedCart = savedCart.map((savedItem: Item) => {
        // Check if the product already exists in guestCart
        const matchingGuestItem = guestCart.find(
          (guestItem: Item) => guestItem.productSCId === savedItem.productSCId
        );

        if (matchingGuestItem) {
          // If it exists, combine the quantities
          const combinedQuantity =
            savedItem.quantity + matchingGuestItem.quantity;

          const productSizeColor = productSizeColors.find(
            (product) => product.id === savedItem.productSCId
          );

          const maxQuantity = productSizeColor ? productSizeColor.quantity : 0;

          // If combined quantity exceeds max quantity, set it to maxQuantity
          return {
            ...savedItem,
            quantity: Math.min(combinedQuantity, maxQuantity),
          };
        } else {
          // If no match, keep the savedItem as is
          return savedItem;
        }
      });

      guestCart.forEach((guestItem: Item) => {
        const matchingSavedItem = savedCart.find(
          (savedItem: Item) => savedItem.productSCId === guestItem.productSCId
        );
        if (!matchingSavedItem) {
          // If the item doesn't exist in savedCart, add it and limit quantity by available stock
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

      // Encrypt the combined cart before saving it to the cookie
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
    <div className="bg-slate-50">
      {customerAppSliceLoading ? (
        <div className="flex justify-center items-center h-screen">
          <LoaderCircle className="animate-spin w-10 h-10" />
        </div>
      ) : (
        <div>
          <NavBar />
          {children}
          <Footer />
        </div>
      )}
    </div>
  );
};

export default CustomerPageLayout;
