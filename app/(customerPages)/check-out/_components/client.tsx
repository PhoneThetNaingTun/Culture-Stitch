"use client";
import CheckoutForm from "./checkoutForm";
import { useAppSelector } from "@/store/hooks";
import ProductCardCheckOut from "./productCartCheckOut";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";

export default function CheckOutPageClient() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.CustomerApp);
  const { items } = useAppSelector((state) => state.AddToCart);
  const { products } = useAppSelector((state) => state.Product);
  const { productSizeColors } = useAppSelector(
    (state) => state.ProductSizeColor
  );
  const { productColors } = useAppSelector((state) => state.ProductColor);

  useEffect(() => {
    if (items.length <= 0) {
      router.push("/home");
    }
  }, [items]);

  if (items.length <= 0) return null;

  return (
    <div className="px-6 lg:px-28 3xl:px-96 flex flex-col  gap-3 mt-5">
      <div className="flx-1">
        <CheckoutForm
          user={user}
          items={items}
          products={products}
          productColors={productColors}
          productSizeColors={productSizeColors}
        />
      </div>
      <div className="flex-1 ">
        <div className="flex flex-col gap-3 overflow-y-scroll scrollbar-none h-full">
          <p className="font-roboto font-semibold text-lg flex items-center gap-2">
            <ShoppingBag className="w-7 h-7" /> Your Items
          </p>
          <div className="grid grid-cols-2 gap-5 border border-black shadow-lg rounded-lg p-10">
            {items.map((item) => (
              <div className="w-full" key={item.productSCId}>
                <ProductCardCheckOut item={item} />
                <Separator className="mt-5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
