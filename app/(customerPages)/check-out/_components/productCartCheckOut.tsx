import { useAppSelector } from "@/store/hooks";
import { Item } from "@/types/addToCart";
import Image from "next/image";
import React from "react";

interface Prop {
  item: Item;
}

export default function ProductCardCheckOut({ item }: Prop) {
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
  const product = products.find(
    (product) => product.id === productColor?.productId
  );
  const size = sizes.find((size) => size.id === productSizeColor?.sizeId);
  return (
    <div className="flex items-center gap-3 relative">
      <div className="flex-1">
        <Image
          src={`/products/${productColor?.image}` || ""}
          alt={productColor?.image || ""}
          className="object-cover rounded-lg"
          width={500}
          height={500}
        />{" "}
      </div>
      <div className="flex gap-10 items-end flex-1">
        <div>
          <p className="font-roboto font-semibold">{product?.name}</p>
          <p className="font-roboto text-gray-500">
            Price :{product?.price} Ks
          </p>
          <p className="font-roboto text-gray-500">Size :{size?.size}</p>
        </div>
      </div>
      <div className="absolute border rounded-sm  px-3 py-1 bottom-0 right-0">
        <p className="font-roboto font-semibold">x{item.quantity}</p>
      </div>
    </div>
  );
}
