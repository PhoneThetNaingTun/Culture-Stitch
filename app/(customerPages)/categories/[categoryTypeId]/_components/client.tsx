"use client";

import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CategoryTypePageClient() {
  const router = useRouter();
  const param = useParams();
  const { categoryTypeId } = param;

  const { categoryTypes } = useAppSelector((state) => state.CategoryType);
  const { productCategories } = useAppSelector(
    (state) => state.ProductCategory
  );

  const categoryType = categoryTypes.find((item) => item.id === categoryTypeId);
  const productCategory = productCategories.filter(
    (item) => item.categoryTypeId === categoryTypeId
  );
  useEffect(() => {
    if (!categoryType) {
      return router.push("/home");
    }
  }, [categoryType]);
  return (
    <div className="px-6 lg:px-28 w-full">
      <div
        className="flex justify-center items-center flex-col gap-10 "
        style={{ height: "calc(100vh - 300px)" }}
      >
        <p className="font-roboto font-semibold text-2xl md:text-5xl lg:text-8xl">
          {categoryType?.categroyTypeName}
        </p>
        <div className="flex gap-4 flex-wrap justify-center lg:max-w-96">
          {productCategory.map((item) => (
            <Link
              key={item.id}
              href={`/categories/${categoryType?.id}/${item.id}`}
              className="relative px-10 py-3 bg-black  shadow-xl text-white cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
            >
              {item.categoryName}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
