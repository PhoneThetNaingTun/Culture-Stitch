"use client";

import { useAppSelector } from "@/store/hooks";
import { Products } from "@prisma/client";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilterSheet from "../[categoryId]/_components/filterSheet";
import { motion } from "motion/react";
import ProductCard from "@/components/customerPage/productCard";

export default function CategoryTypePageClient() {
  const router = useRouter();
  const param = useParams();
  const { categoryTypeId } = param;
  const searchParam = useSearchParams();
  const { categoryId } = param;

  const { sizes } = useAppSelector((state) => state.Size);
  const { colors } = useAppSelector((state) => state.Color);
  const { products } = useAppSelector((state) => state.Product);
  const { productSizeColors } = useAppSelector(
    (state) => state.ProductSizeColor
  );
  const { productColors } = useAppSelector((state) => state.ProductColor);
  const { categoryTypes } = useAppSelector((state) => state.CategoryType);
  const { productCategories } = useAppSelector(
    (state) => state.ProductCategory
  );

  const categoryType = categoryTypes.find((item) => item.id === categoryTypeId);
  const productCategory = productCategories.filter(
    (item) => item.categoryTypeId === categoryTypeId
  );

  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);

  const filterSize = sizes.find((item) => item.id === searchParam.get("fs"));
  const filterColor = colors.find(
    (items) => items.id === searchParam.get("fc")
  );

  const productInCategory = products.filter((item) =>
    productCategory.find((pCy) => pCy.id === item.productCategoryId)
  );
  useEffect(() => {
    if (filterColor && !filterSize) {
      const findProductColor = productColors.filter(
        (item) => item.colorId === filterColor.id
      );
      const product = productInCategory.filter((item) =>
        findProductColor.find(
          (productColor) => productColor.productId === item.id
        )
      );
      setFilteredProducts(product);
    } else if (!filterColor && filterSize) {
      const findProductSizeColor = productSizeColors.filter(
        (item) => item.sizeId === filterSize.id
      );
      const findProductColorWithSize = productColors.filter((item) =>
        findProductSizeColor.find(
          (productSizeColor) => productSizeColor.productColorId === item.id
        )
      );
      const product = productInCategory.filter((item) =>
        findProductColorWithSize.find(
          (productColor) => productColor.productId === item.id
        )
      );
      setFilteredProducts(product);
    } else if (filterColor && filterSize) {
      const findProductSizeColor = productSizeColors.filter(
        (item) => item.sizeId === filterSize.id
      );
      const findProductColorWithColorAndSize = productColors.filter((item) =>
        findProductSizeColor.find(
          (productSizeColor) =>
            productSizeColor.productColorId === item.id &&
            item.colorId === filterColor.id
        )
      );
      const product = productInCategory.filter((item) =>
        findProductColorWithColorAndSize.find(
          (productColor) => productColor.productId === item.id
        )
      );
      setFilteredProducts(product);
    } else {
      setFilteredProducts(productInCategory);
    }
  }, [filterSize, filterColor]);
  useEffect(() => {
    if (!productCategory) {
      return router.push("/home");
    }
  }, [productCategory]);
  if (!productCategory) {
    return null;
  }

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
      <div>
        <FilterSheet />
      </div>
      <div>
        {productInCategory.length === 0 ? (
          <p className="text-center">No Product Found</p>
        ) : (
          <>
            {filterColor || filterSize ? (
              filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 gap-4">
                    <ProductCard data={item} />
                  </div>
                ))
              ) : (
                <div className="w-full h-52 flex justify-center items-center">
                  <p>No Product Found</p>
                </div>
              )
            ) : (
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 gap-4"
              >
                {productInCategory.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ ease: "easeInOut" }}
                  >
                    <ProductCard data={item} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
