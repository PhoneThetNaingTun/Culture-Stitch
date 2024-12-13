//@ts-nocheck
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { TotalCalc, TotalQuantity } from "@/lib/general";
import { CreateCheckOut } from "@/store/Slices/CheckOutSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Item } from "@/types/addToCart";
import { NewCheckOutPayload } from "@/types/checkOut";
import {
  ProductColors,
  ProductSizeColors,
  Products,
  User,
} from "@prisma/client";
import { CircleDollarSign, Package, Receipt, RefreshCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { clearItems } from "@/store/Slices/AddToCartSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import CheckOutDialog from "./checkOutDialog";

interface Prop {
  user: any;
  items: Item[];
  products: Products[];
  productSizeColors: ProductSizeColors[];
  productColors: ProductColors[];
}

export default function CheckoutForm({
  user,
  items,
  products,
  productColors,
  productSizeColors,
}: Prop) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { checkOutLoading } = useAppSelector((state) => state.CheckOut);

  const [checkOutData, setCheckOutData] = useState<NewCheckOutPayload>();

  const itemdata = items.map((item) => {
    const productSCId = item.productSCId;
    const quantity = item.quantity;
    return { productSCId, quantity };
  });

  const handleCheckOut = () => {
    if (
      !checkOutData?.userId ||
      !checkOutData.city ||
      !checkOutData.name ||
      !checkOutData.city ||
      !checkOutData.state ||
      !checkOutData.phone ||
      !checkOutData.address
    ) {
      return toast({
        title: "Please Fill Out All Fields!",
        variant: "destructive",
      });
    }
    dispatch(
      CreateCheckOut({
        ...checkOutData,
        onSuccess: (message) => {
          const userId = user.id;
          const userCartKey = userId ? `atc_${userId}` : `guest`;

          const encryptedEmptyCart = CryptoJS.AES.encrypt(
            JSON.stringify([]),
            String(process.env.NEXT_PUBLIC_COOKIE_KEY)
          ).toString();

          Cookies.set(userCartKey, encryptedEmptyCart, {
            expires: 7,
            path: "/",
            secure: true,
            sameSite: "Strict",
          });

          dispatch(clearItems());

          // Show a toast or any feedback
          toast({ title: message, variant: "default" });
          router.push("/home");
        },
        onError: (error) => {
          return toast({ title: error, variant: "destructive" });
        },
      })
    );
  };

  useEffect(() => {
    setCheckOutData({
      userId: user.id,
      name: user.name,
      productSCIds: itemdata,
      city: "",
      state: "",
      phone: user.phone,
      address: user.address,
    });
  }, [user, items]);
  return (
    <Card>
      <CardHeader className="font-roboto font-semibold text-xl lg:text-2xl">
        <div className="flex items-center gap-1">
          <Receipt className="w-7 h-7" /> Check Out
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Name*</Label>
            <Input
              disabled={checkOutLoading}
              defaultValue={user.name || ""}
              onChange={(e: string) => {
                setCheckOutData({ ...checkOutData, city: e.target.value });
              }}
            />
          </div>

          <div>
            <Label>Address*</Label>
            <Input
              disabled={checkOutLoading}
              defaultValue={user.address || ""}
              onChange={(e: string) => {
                setCheckOutData({ ...checkOutData, address: e.target.value });
              }}
            />
          </div>
          <div>
            <Label>Phone*</Label>
            <Input
              disabled={checkOutLoading}
              defaultValue={user.phone || ""}
              onChange={(e: string) => {
                setCheckOutData({ ...checkOutData, phone: e.target.value });
              }}
            />
          </div>
          <div>
            <Label>City*</Label>
            <Input
              disabled={checkOutLoading}
              onChange={(e: string) => {
                setCheckOutData({ ...checkOutData, city: e.target.value });
              }}
            />
          </div>
          <div>
            <Label>State*</Label>
            <Input
              disabled={checkOutLoading}
              onChange={(e: string) => {
                setCheckOutData({ ...checkOutData, state: e.target.value });
              }}
            />
          </div>
        </div>
        <Separator className="mt-5 mb-2" />
        <div className="flex justify-between items-center mt-5">
          <span className="flex flex-row items-center mb-1">
            <Package className="w-4 h-4 mr-1" />
            <span>Total Items : </span>
            <span className="ml-1 text-black font-semibold">
              {TotalQuantity(items) === 0 ? "" : TotalQuantity(items)}
            </span>
          </span>
          <span className="flex flex-row items-center">
            <CircleDollarSign className="w-4 h-4 mr-1" /> Total Price :
            <span className="ml-1 text-black font-semibold text-lg">
              {TotalCalc(items, productSizeColors, products, productColors) ===
              0
                ? ""
                : TotalCalc(items, productSizeColors, products, productColors)}
            </span>
          </span>
        </div>
        <div className="flex justify-end mt-5">
          <CheckOutDialog
            onClick={handleCheckOut}
            checkOutData={checkOutData}
            loading={checkOutLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
}
