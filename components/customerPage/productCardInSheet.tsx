import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Item } from "@/types/addToCart";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import {
  DecreaseItemQuantity,
  IncreaseItemQuantity,
  editItem,
  removeItem,
} from "@/store/Slices/AddToCartSlice";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

interface Prop {
  item: Item;
  loading: boolean;
}

export default function ProductCardInSheet({ item, loading }: Prop) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [selectedQuantity, setSelectedQuantity] = useState<number>(
    item.quantity
  );
  const { user } = useAppSelector((state) => state.CustomerApp);
  const { productSizeColors } = useAppSelector(
    (state) => state.ProductSizeColor
  );
  const { products } = useAppSelector((state) => state.Product);
  const { sizes } = useAppSelector((state) => state.Size);
  const { productColors } = useAppSelector((state) => state.ProductColor);
  const { colors } = useAppSelector((state) => state.Color);

  const productSizeColor = productSizeColors.find(
    (pSc) => pSc.id === item.productSCId
  );
  const productColor = productColors.find(
    (pc) => pc.id === productSizeColor?.productColorId
  );
  const size = sizes.find((size) => size.id === productSizeColor?.sizeId);
  const color = colors.find((color) => color.id === productColor?.colorId);
  const product = products.find(
    (product) => product.id === productColor?.productId
  );

  const handleIncreaseQuantity = () => {
    const userId = user.id;
    const userCartKey = userId ? `atc_${userId}` : `guest`;
    const newQuantity = selectedQuantity + 1;
    setSelectedQuantity(newQuantity);

    const cartData = Cookies.get(userCartKey);
    let cart: Item[] = [];

    if (cartData) {
      try {
        const bytes = CryptoJS.AES.decrypt(
          cartData,
          String(process.env.NEXT_PUBLIC_COOKIE_KEY)
        );
        const decryptedCart = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedCart) {
          cart = JSON.parse(decryptedCart);
        }
      } catch (error) {
        console.error("Failed to decrypt cart data:", error);
      }
    }

    const findProduct = cart.find(
      (cartItem: Item) => cartItem.productSCId === item.productSCId
    );

    if (findProduct) {
      // Update the quantity of the product in the cart
      const updatedCart = cart.map((cartItem: Item) => {
        if (cartItem.productSCId === item.productSCId) {
          return { ...cartItem, quantity: newQuantity }; // Update quantity
        }
        return cartItem;
      });

      // Encrypt the updated cart data
      const encryptedCart = CryptoJS.AES.encrypt(
        JSON.stringify(updatedCart),
        String(process.env.NEXT_PUBLIC_COOKIE_KEY)
      ).toString();

      // Save the updated encrypted cart back to the cookies
      Cookies.set(userCartKey, encryptedCart, {
        expires: 7,
        path: "/",
        secure: true,
        sameSite: "Strict",
      });

      // Dispatch to Redux (or perform any other necessary actions)
      dispatch(IncreaseItemQuantity({ ...item, quantity: newQuantity }));
    } else {
      console.log("Product not found in the cart");
    }
  };

  const handleDecreaseQuantity = () => {
    const userId = user.id;
    const userCartKey = userId ? `atc_${userId}` : `guest`;
    const newQuantity = selectedQuantity - 1;
    setSelectedQuantity(newQuantity);

    const cartData = Cookies.get(userCartKey);
    let cart: Item[] = [];

    if (cartData) {
      try {
        const bytes = CryptoJS.AES.decrypt(
          cartData,
          String(process.env.NEXT_PUBLIC_COOKIE_KEY)
        );
        const decryptedCart = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedCart) {
          cart = JSON.parse(decryptedCart);
        }
      } catch (error) {
        console.error("Failed to decrypt cart data:", error);
      }
    }

    const findProduct = cart.find(
      (cartItem: Item) => cartItem.productSCId === item.productSCId
    );

    if (findProduct) {
      const updatedCart = cart.map((cartItem: Item) => {
        if (cartItem.productSCId === item.productSCId) {
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      });

      const encryptedCart = CryptoJS.AES.encrypt(
        JSON.stringify(updatedCart),
        String(process.env.NEXT_PUBLIC_COOKIE_KEY)
      ).toString();

      Cookies.set(userCartKey, encryptedCart, {
        expires: 7,
        path: "/",
        secure: true,
        sameSite: "Strict",
      });

      dispatch(IncreaseItemQuantity({ ...item, quantity: newQuantity }));
    } else {
      console.log("Product not found in the cart");
    }
  };
  return (
    <div className="flex items-start gap-4 h-full">
      <div className="flex-1">
        <Image
          src={`/products/${productColor?.image}` || ""}
          alt={productColor?.image || ""}
          className="object-cover rounded-lg"
          width={500}
          height={500}
        />{" "}
      </div>
      <div className="flex-1   flex flex-col justify-between gap-4">
        <div>
          <p className="font-michroma font-semibold">{product?.name}</p>
          <p className="font-roboto text-gray-500 text-sm">
            Price : {product?.price} Ks
          </p>
          <p className="font-roboto text-gray-500 text-sm">
            Size : {size?.size}
          </p>
          <div className="font-roboto text-gray-500 flex items-center gap-3 text-sm">
            Color :
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: color?.color }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="flex">
            <Button
              variant="ghost"
              disabled={selectedQuantity === 1}
              onClick={handleDecreaseQuantity}
              className="select-none"
            >
              -
            </Button>
            <Input
              className="max-w-16 appearance-none focus-visible:ring-0 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none shadow-none border-x-0 rounded-none border-t-0 border-b-2 border-black"
              value={selectedQuantity}
              readOnly
            />
            <Button
              variant="ghost"
              disabled={selectedQuantity >= Number(productSizeColor?.quantity)}
              onClick={handleIncreaseQuantity}
              className="select-none"
            >
              +
            </Button>
          </div>
          <div className="flex justify-end">
            <Button
              className="bg-red-500 hover:bg-red-700 text-xs select-none"
              onClick={() => {
                const userId = user.id;
                const userCartKey = userId ? `atc_${userId}` : `guest`;

                const cartData = Cookies.get(userCartKey);
                let existingCart: Item[] = [];

                if (cartData) {
                  try {
                    const bytes = CryptoJS.AES.decrypt(
                      cartData,
                      String(process.env.NEXT_PUBLIC_COOKIE_KEY)
                    );
                    const decryptedCart = bytes.toString(CryptoJS.enc.Utf8);

                    if (decryptedCart) {
                      existingCart = JSON.parse(decryptedCart); // Parse decrypted cart data
                    }
                  } catch (error) {
                    console.error("Failed to decrypt cart data:", error);
                  }
                }

                const updatedCart = existingCart.filter(
                  (exC: Item) => exC.productSCId !== item.productSCId
                );

                const encryptedCart = CryptoJS.AES.encrypt(
                  JSON.stringify(updatedCart),
                  String(process.env.NEXT_PUBLIC_COOKIE_KEY)
                ).toString();

                Cookies.set(userCartKey, encryptedCart, {
                  expires: 7,
                  path: "/",
                  secure: true,
                  sameSite: "Strict",
                });

                dispatch(removeItem(item.productSCId as string));

                toast({
                  title: "Item removed from cart!",
                  variant: "default",
                });
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
