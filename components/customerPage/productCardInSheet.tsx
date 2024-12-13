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

  const productSizeColor = productSizeColors.find(
    (pSc) => pSc.id === item.productSCId
  );
  const productColor = productColors.find(
    (pc) => pc.id === productSizeColor?.productColorId
  );
  const size = sizes.find((size) => size.id === productSizeColor?.sizeId);
  const product = products.find(
    (product) => product.id === productColor?.productId
  );

  const handleIncreaseQuantity = () => {
    const userId = user.id;
    const userCartKey = userId ? `atc_${userId}` : `guest`;
    const newQuantity = selectedQuantity + 1;
    setSelectedQuantity(newQuantity);

    // Retrieve and decrypt the cart data from the cookies
    const cartData = Cookies.get(userCartKey);
    let cart: Item[] = [];

    if (cartData) {
      try {
        // Decrypt the cart data
        const bytes = CryptoJS.AES.decrypt(
          cartData,
          String(process.env.NEXT_PUBLIC_COOKIE_KEY)
        );
        const decryptedCart = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedCart) {
          cart = JSON.parse(decryptedCart); // Parse decrypted cart data
        }
      } catch (error) {
        console.error("Failed to decrypt cart data:", error);
      }
    }

    // Find the product in the cart to update its quantity
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

    // Retrieve and decrypt the cart data from the cookies
    const cartData = Cookies.get(userCartKey);
    let cart: Item[] = [];

    if (cartData) {
      try {
        // Decrypt the cart data
        const bytes = CryptoJS.AES.decrypt(
          cartData,
          String(process.env.NEXT_PUBLIC_COOKIE_KEY)
        );
        const decryptedCart = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedCart) {
          cart = JSON.parse(decryptedCart); // Parse decrypted cart data
        }
      } catch (error) {
        console.error("Failed to decrypt cart data:", error);
      }
    }

    // Find the product in the cart to update its quantity
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
          <p className="font-roboto font-semibold">{product?.name}</p>
          <p className="font-roboto text-gray-500">
            Price :{product?.price} Ks
          </p>
          <p className="font-roboto text-gray-500">Size :{size?.size}</p>
        </div>
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

              // Decrypt the existing cart data from cookies
              const cartData = Cookies.get(userCartKey);
              let existingCart: Item[] = [];

              if (cartData) {
                try {
                  // Decrypt the cart data
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

              // Filter out the item to be removed from the cart
              const updatedCart = existingCart.filter(
                (exC: Item) => exC.productSCId !== item.productSCId
              );

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

              // Dispatch Redux action to remove item (if necessary)
              dispatch(removeItem(item.productSCId as string));

              // Show success message
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
  );
}
