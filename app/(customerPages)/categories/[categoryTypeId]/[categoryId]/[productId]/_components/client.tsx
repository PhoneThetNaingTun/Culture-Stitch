"use client";

import ProductCard, {
  SelectedColor,
} from "@/components/customerPage/productCard";
import { SelectedSize } from "@/components/customerPage/productCardView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { AddItems } from "@/store/Slices/AddToCartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { motion } from "motion/react";
import HyperText from "@/components/ui/hyper-text";
import { Loader, Palette, Ruler, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CryptoJS from "crypto-js";
import { cn } from "@/lib/utils";

export default function ProductPageClient() {
  const router = useRouter();
  const param = useParams();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { productId, categoryId } = param;

  const { items } = useAppSelector((state) => state.AddToCart);
  const { products } = useAppSelector((state) => state.Product);
  const { colors } = useAppSelector((state) => state.Color);
  const { productColors } = useAppSelector((state) => state.ProductColor);
  const { productSizeColors } = useAppSelector(
    (state) => state.ProductSizeColor
  );
  const { productCategories } = useAppSelector(
    (state) => state.ProductCategory
  );
  const { types } = useAppSelector((state) => state.ProductType);
  const { sizes } = useAppSelector((state) => state.Size);
  const { user } = useAppSelector((state) => state.CustomerApp);

  const [selectedColor, setSelectedColor] = useState<SelectedColor>();
  const [selectedSize, setSelectedSize] = useState<SelectedSize>();
  const [quantity, setQuantity] = useState<number>(1);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const product = products.find((item) => item.id === productId);

  const productCategory = productCategories.find(
    (item) => item.id === categoryId
  );
  const findColors = productColors.filter(
    (color) => color.productId === productId
  );
  const color = findColors.map((item) => {
    const id = item.id;
    const color = colors.find((color) => color.id === item.colorId)?.color;
    const colorId = colors.find((color) => color.id === item.colorId)?.id;
    const image = item.image;
    return { id, color, image, colorId };
  });
  const productSizeColor = productSizeColors.filter((item) =>
    color.find((colorData) => colorData.id === item.productColorId)
  );
  const sizeData = Array.from(
    new Map(
      productSizeColor.map((item) => {
        const sizeId = item.sizeId;
        const size = sizes.find((size) => size.id === item.sizeId)?.size;
        return [sizeId, { sizeId, size }];
      })
    ).values()
  );
  const productType = types.find((item) => item.id === product?.typeId);
  const productColor = productColors.find(
    (item) =>
      item.productId === product?.id && item.colorId === selectedColor?.colorId
  );

  const quantityFind = productSizeColor.find(
    (item) =>
      item.productColorId === productColor?.id &&
      item.sizeId === selectedSize?.id
  );
  const productSC = productSizeColor.find(
    (item) =>
      item.productColorId === productColor?.id &&
      item.sizeId === selectedSize?.id
  );
  const relatedProducts = products.filter(
    (item) => item.productCategoryId === categoryId && item.id !== product?.id
  );

  useEffect(() => {
    if (!product) {
      return router.push("/home");
    }
  }, [product]);
  if (!product) {
    return null;
  }
  return (
    <div className="w-full px-6 lg:px-28 3xl:px-96">
      <div className="mt-36 md:mt-0 mb-10 flex items-center">
        <div className="flex flex-col items-center md:flex-row w-full  gap-10  pt-10">
          <motion.div
            initial={{ opacity: 0, x: -30, y: -30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.3, ease: "easeInOut" }}
            className="relative"
          >
            <Image
              src={
                selectedColor?.color && selectedColor.color
                  ? `/products/${selectedColor.image}`
                  : `/products/${product?.image}`
              }
              alt={product?.image || ""}
              className="object-cover  rounded-lg "
              width={700}
              height={700}
              onLoad={() => setImageLoading(false)}
            />
            {imageLoading && (
              <div className="w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 flex justify-center items-center">
                <Loader className="w-12 h-12 text-white animate-spin" />
              </div>
            )}
          </motion.div>
          <div className="w-full md:min-w-[50%]  font-roboto flex flex-col p-4 lg:p-0 md:overflow-hidden md:flex-row gap-10  md:h-full">
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, x: 30, y: -30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.3, ease: "easeInOut" }}
                className="font-michroma"
              >
                <p className="font-semibold text-xl lg:text-4xl">
                  {product?.name}
                </p>
                <p className="text-sm lg:text-lg py-3 text-gray-600">
                  Category : {productCategory?.categoryName} <br />
                  <span className="text-sm">
                    Material Type : {productType?.type}
                  </span>
                </p>
              </motion.div>
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, ease: "easeInOut" }}
                  className="font-michroma"
                >
                  <p className="font-semibold  my-3 flex items-center gap-1">
                    <Palette className="w-4 h-4 " />
                    Color
                  </p>
                  <div className="flex gap-1 items-center">
                    {color.map((item) => (
                      <div
                        className={cn(
                          "w-5 h-5 cursor-pointer rounded-full mr-1",
                          selectedColor?.color === item.color
                            ? "  border-[2px] border-black"
                            : " border border-gray-600"
                        )}
                        style={{ backgroundColor: item.color }}
                        onClick={() => {
                          if (item.id === selectedColor?.id) {
                            return;
                          }
                          setImageLoading(true);
                          setSelectedColor({
                            id: item.id,
                            color: item.color,
                            image: item.image,
                            colorId: item.colorId,
                          });
                          setQuantity(1);
                        }}
                        key={item.id}
                      />
                    ))}
                  </div>
                </motion.div>

                <Separator className="my-2" />
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, ease: "easeInOut" }}
                  className="font-michroma"
                >
                  <p className=" font-semibold flex items-center gap-1 my-3">
                    <Ruler className="w-4 h-4" />
                    Sizes
                  </p>
                  <div className="flex items-center gap-2">
                    {sizeData.map((item) => (
                      <div
                        className={
                          selectedSize?.id === item.sizeId
                            ? "border-[2px] border-black cursor-pointer"
                            : "cursor-pointer"
                        }
                        key={item.sizeId}
                        onClick={() => {
                          if (item.sizeId === selectedSize?.id) {
                            return;
                          }
                          setSelectedSize({ id: item.sizeId, size: item.size });
                          setQuantity(1);
                        }}
                      >
                        <p className="py-1 px-3">{item.size}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <Separator className="my-2" />
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 mt-1">
                    <span className="opacity-50 text-sm font-michroma">
                      Choosen Color :
                    </span>
                    {selectedColor ? (
                      <div
                        className="w-5 h-5 border rounded-full border-black"
                        style={{ backgroundColor: selectedColor.color }}
                      />
                    ) : (
                      "-"
                    )}
                  </div>
                  <div className="flex items-center gap-2 my-2">
                    <span className="opacity-50 text-sm font-michroma">
                      Choosen Size :
                    </span>
                    {selectedSize ? (
                      <div className="">
                        <p className="py-1 px-3 font-michroma font-semibold">
                          {selectedSize.size}
                        </p>
                      </div>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>
                <div>
                  {selectedColor && selectedSize ? (
                    <>
                      {quantityFind?.quantity !== 0 && quantityFind ? (
                        <Badge className="bg-green-500 rounded-full hover:bg-green-700">
                          Instock : {quantityFind.quantity}
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500 rounded-full hover:bg-red-700">
                          Out Of Stock
                        </Badge>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mt-3 text-lg flex items-center gap-1 font-michroma">
                  Price :
                  <HyperText
                    className="font-michroma font-semibold"
                    text={String(product.price)}
                  />
                  ks
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, ease: "easeInOut" }}
                  className="flex flex-col w-full items-center md:flex-row md:justify-end gap-3"
                >
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        if (quantity > 0) {
                          setQuantity(quantity - 1);
                        }
                      }}
                      disabled={
                        selectedColor &&
                        selectedSize &&
                        quantityFind?.quantity !== 0 &&
                        quantityFind
                          ? false
                          : true
                      }
                    >
                      -
                    </Button>
                    <Input
                      disabled={
                        selectedColor &&
                        selectedSize &&
                        quantityFind?.quantity !== 0 &&
                        quantityFind
                          ? false
                          : true
                      }
                      value={quantity}
                      type="number"
                      min={0}
                      max={quantityFind?.quantity}
                      readOnly
                      className="max-w-12 appearance-none focus-visible:ring-0 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none shadow-none border-x-0 rounded-none border-t-0 border-b-2 border-black"
                      onChange={(e) => {
                        setQuantity(Number(e.target.value));
                      }}
                    />
                    <Button
                      variant="ghost"
                      onClick={() => {
                        if (quantityFind) {
                          if (quantity < quantityFind.quantity) {
                            setQuantity(quantity + 1);
                          }
                        }
                      }}
                      disabled={
                        selectedColor &&
                        selectedSize &&
                        quantityFind?.quantity !== 0 &&
                        quantityFind
                          ? false
                          : true
                      }
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    className="rounded-none w-full md:w-fit text-xl px-5 py-3 font-michroma"
                    disabled={
                      selectedColor &&
                      selectedSize &&
                      quantityFind?.quantity !== 0 &&
                      quantityFind
                        ? false
                        : true
                    }
                    onClick={() => {
                      const userId = user.id;

                      if (!productSC?.id) {
                        return toast({
                          title: "Invalid product.",
                          variant: "destructive",
                        });
                      }

                      const userCartKey = userId ? `atc_${userId}` : `guest`;
                      const encryptedCart = Cookies.get(userCartKey);

                      let existingCart = [];

                      if (encryptedCart) {
                        const bytes = CryptoJS.AES.decrypt(
                          encryptedCart,
                          String(process.env.NEXT_PUBLIC_COOKIE_KEY)
                        );
                        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

                        if (decryptedData) {
                          existingCart = JSON.parse(decryptedData);
                        }
                      }

                      const findItem = existingCart.find(
                        (item: any) => item.productSCId === productSC?.id
                      );

                      if (findItem) {
                        return toast({
                          title: "This item is already in the cart!",
                          variant: "destructive",
                        });
                      }

                      const newCartItem = {
                        productSCId: productSC?.id,
                        quantity: quantity,
                      };

                      existingCart.push(newCartItem);

                      const encryptedCartData = CryptoJS.AES.encrypt(
                        JSON.stringify(existingCart),
                        String(process.env.NEXT_PUBLIC_COOKIE_KEY)
                      ).toString();

                      Cookies.set(userCartKey, encryptedCartData, {
                        expires: 7,
                        path: "/",
                        secure: true,
                        sameSite: "Strict",
                      });

                      dispatch(AddItems(newCartItem));

                      toast({
                        title: "Item added to cart!",
                        variant: "default",
                      });
                    }}
                  >
                    <ShoppingCart className="w-8 h-8" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="font-roboto font-semibold text-2xl lg:text-3xl">
          Related Products
        </p>
        <Separator className="rounded-lg bg-black mb-4" />
        <div>
          {relatedProducts.length !== 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 gap-4">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} data={item} />
              ))}
            </div>
          ) : (
            <p className="text-lg">No Products!</p>
          )}
        </div>
      </div>
    </div>
  );
}
