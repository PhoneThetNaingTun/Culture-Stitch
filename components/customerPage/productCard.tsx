"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import Image from "next/image";
import { Products } from "@prisma/client";
import { useAppSelector } from "@/store/hooks";
import ProductCardView from "./productCardView";
import Link from "next/link";
import { Ellipsis, Loader } from "lucide-react";

interface Prop {
  data: Products;
}

export type SelectedColor = {
  id: string;
  color?: string;
  image: string;
  colorId?: string;
};

export default function ProductCard({ data }: Prop) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState<SelectedColor>({
    id: "",
    color: "",
    image: "",
    colorId: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  const { categoryTypes } = useAppSelector((state) => state.CategoryType);
  const { productCategories } = useAppSelector(
    (state) => state.ProductCategory
  );
  const { productColors } = useAppSelector((state) => state.ProductColor);
  const { colors } = useAppSelector((state) => state.Color);
  const { productSizeColors } = useAppSelector(
    (state) => state.ProductSizeColor
  );

  const productCategory = productCategories.find(
    (item) => item.id === data.productCategoryId
  );

  const categoryType = categoryTypes.find(
    (item) => item.id === productCategory?.categoryTypeId
  );

  const findProduct = productColors.filter(
    (item) => item.productId === data.id
  );

  const productColordata = findProduct.map((item) => {
    const color = colors.find((color) => color.id === item.colorId)?.color;
    return { ...item, color };
  });

  const findProductSizeColor = productSizeColors.filter((item) =>
    productColordata.some((colorData) => colorData.id === item.productColorId)
  );

  return (
    <Card className="h-full rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden bg-white">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full aspect-[4/5] overflow-hidden"
      >
        <Image
          src={
            selectedColor.image
              ? `/products/${selectedColor.image}`
              : `/products/${data.image}`
          }
          alt={data.name}
          width={400}
          height={500}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
          onLoad={() => setLoading(false)}
        />
        <div className={isHovered ? " flex absolute top-2 right-2" : "hidden"}>
          <ProductCardView
            product={data}
            color={productColordata}
            productSizeColor={findProductSizeColor}
            productCategory={productCategory}
          />
        </div>
        {loading && (
          <div className="w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 flex justify-center items-center">
            <Loader className="w-12 h-12 text-white animate-spin" />
          </div>
        )}
      </div>

      <CardHeader className="px-3 pt-3">
        <h3 className=" text-base whitespace-wrap text-ellipsis overflow-hidden  font-semibold text-gray-900 h-12 ">
          {data.name}
        </h3>
        <CardDescription className="text-xs text-gray-600 mt-1">
          {productCategory?.categoryName}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-3 ">
        <div className="flex gap-2 items-center py-2">
          {productColordata.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setLoading(true);
                setSelectedColor({
                  id: item.id,
                  color: item.color,
                  image: item.image,
                  colorId: item.colorId,
                });
                setTimeout(() => setLoading(false), 1000);
              }}
              className={`w-5 h-5 cursor-pointer rounded-full ${
                selectedColor.color === item.color
                  ? "border-2 border-gray-900"
                  : "border border-gray-300"
              }`}
              style={{ backgroundColor: item.color }}
            ></div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-sm font-semibold text-gray-800">{data.price} Ks</p>
          <Link
            href={`/categories/${categoryType?.id}/${productCategory?.id}/${data.id}`}
            className="bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-md hover:bg-gray-700 transition-all duration-300"
          >
            View
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
