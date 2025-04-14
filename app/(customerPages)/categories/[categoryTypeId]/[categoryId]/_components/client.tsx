"use client";

import { useAppSelector } from "@/store/hooks";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import FilterSheet from "./filterSheet";
import ProductCard from "@/components/customerPage/productCard";
import { useEffect, useState } from "react";
import { Products } from "@prisma/client";
import { motion } from "motion/react";

export default function CategoryPageClient() {
  const router = useRouter();
  const param = useParams();
  const searchParam = useSearchParams();
  const { categoryId } = param;
  const { productCategories } = useAppSelector(
    (state) => state.ProductCategory
  );
  const { sizes } = useAppSelector((state) => state.Size);
  const { colors } = useAppSelector((state) => state.Color);
  const { products } = useAppSelector((state) => state.Product);
  const { productSizeColors } = useAppSelector(
    (state) => state.ProductSizeColor
  );
  const { productColors } = useAppSelector((state) => state.ProductColor);

  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);

  const filterSize = sizes.find((item) => item.id === searchParam.get("fs"));
  const filterColor = colors.find(
    (items) => items.id === searchParam.get("fc")
  );
  const productCategory = productCategories.find(
    (item) => item.id === categoryId
  );

  const productInCategory = products.filter(
    (item) => item.productCategoryId === categoryId
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
  return (
    <div className="px-6 lg:px-28 w-full 3xl:px-96">
      <div className="flex justify-center items-center flex-col gap-10 h-72  lg:h-96">
        <p className="font-roboto font-semibold text-2xl md:text-5xl lg:text-8xl">
          {productCategory?.categoryName}
        </p>
      </div>
      <div>
        <FilterSheet />
      </div>
      <div>
        {productInCategory.length === 0 ? (
          <p className="text-center text-lg text-gray-700 ">
            No product found!
          </p>
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
                  <p> No Product Found</p>
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
