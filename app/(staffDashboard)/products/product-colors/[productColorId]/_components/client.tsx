"use client";
import { ImageUpload } from "@/components/imageUpload";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import DeleteButtonDialog from "@/components/ui/delete-button-dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { assetProductUpload } from "@/store/Slices/DashBoardAppSlice";
import {
  DeleteProductColor,
  UpdateProductColor,
} from "@/store/Slices/ProductColorSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdateProductColorPayload } from "@/types/productColor";
import { RefreshCcw, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductColorDetailPageClient() {
  const param = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { productColorId } = param;
  const { productColors, productColorLoading } = useAppSelector(
    (state) => state.ProductColor
  );
  const { imageUploadLoading } = useAppSelector((state) => state.DashBoardApp);
  const { products } = useAppSelector((state) => state.Product);
  const { colors } = useAppSelector((state) => state.Color);

  const [updatedProductColor, setUpdatedProductColor] =
    useState<UpdateProductColorPayload>({
      id: productColorId as string,
      productId: "",
      colorId: "",
      image: "",
    });
  const [imageFile, setImageFile] = useState<File>();
  const productColor = productColors.find((item) => item.id === productColorId);

  useEffect(() => {
    if (productColor) {
      setUpdatedProductColor(productColor);
    }
  }, [productColor]);

  const handleUpdateProductColor = () => {
    if (
      !updatedProductColor.productId ||
      !updatedProductColor.colorId ||
      !updatedProductColor.image
    ) {
      return toast({
        title: "Please fill out all fields!",
        variant: "destructive",
      });
    }
    if (imageFile) {
      dispatch(
        assetProductUpload({
          file: imageFile,
          onSuccess: (image) => {
            dispatch(
              UpdateProductColor({
                ...updatedProductColor,
                image,
                onSuccess: (message) => {
                  toast({ title: message, variant: "default" });
                  router.push("/products");
                },
                onError: (error) => {
                  toast({ title: error, variant: "destructive" });
                },
              })
            );
          },
          onError: (error) => {
            toast({ title: error, variant: "destructive" });
          },
        })
      );
    } else {
      dispatch(
        UpdateProductColor({
          ...updatedProductColor,
          onSuccess: (message) => {
            toast({ title: message, variant: "default" });
            router.push("/products");
          },
          onError: (error) => {
            toast({ title: error, variant: "destructive" });
          },
        })
      );
    }
  };
  const handleDeleteProductColor = () => {
    dispatch(
      DeleteProductColor({
        id: productColorId as string,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/products");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/over-view">DashBoard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Product Color Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-4 flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-roboto font-semibold text-2xl">
              Product Color Details
            </p>
            <DeleteButtonDialog
              onDelete={handleDeleteProductColor}
              loading={productColorLoading}
              header="Product Color"
            />
          </div>
          <div>
            <Label>Product Name</Label>
            <Select
              onValueChange={(e) => {
                setUpdatedProductColor({
                  ...updatedProductColor,
                  productId: e,
                });
              }}
              disabled={productColorLoading || imageUploadLoading}
              value={updatedProductColor.productId}
            >
              <SelectTrigger className="mb-3">
                <SelectValue placeholder="Choose Product " />
              </SelectTrigger>
              <SelectContent>
                {products && products.length > 0
                  ? products.map((product) => (
                      <SelectItem value={product.id} key={product.id}>
                        {product.name}
                      </SelectItem>
                    ))
                  : "Product Not Found"}
              </SelectContent>
            </Select>
            <Label>Color</Label>

            <Select
              onValueChange={(e) => {
                setUpdatedProductColor({
                  ...updatedProductColor,
                  colorId: e,
                });
              }}
              disabled={productColorLoading || imageUploadLoading}
              value={updatedProductColor.colorId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose Color" />
              </SelectTrigger>
              <SelectContent>
                {colors && colors.length > 0
                  ? colors.map((color) => (
                      <SelectItem value={color.id} key={color.id}>
                        <div className="flex items-center gap-x-2">
                          <div
                            className="w-6 h-6 rounded-full border border-gray-600"
                            style={{ backgroundColor: color.color }}
                          />
                          {color.color}
                        </div>
                      </SelectItem>
                    ))
                  : "Color Not Found"}
              </SelectContent>
            </Select>
            <ImageUpload onDrop={(files) => setImageFile(files[0])} />
            {imageFile ? (
              <Badge
                className="bg-gray-300 text-black flex items-center w-fit mt-2"
                onClick={() => setImageFile(undefined)}
              >
                {imageFile.name}
                <span className="ml-2">
                  <X className="w-3 h-3" />
                </span>
              </Badge>
            ) : (
              <Badge
                className="bg-gray-300 text-black flex items-center w-fit mt-2"
                onClick={() =>
                  setUpdatedProductColor({ ...updatedProductColor, image: "" })
                }
              >
                {updatedProductColor?.image}
                <span className="ml-2">
                  <X className="w-3 h-3" />
                </span>
              </Badge>
            )}
            <div className="mt-5 flex justify-end">
              <Button
                className="bg-green-500 hover:bg-green-700"
                disabled={productColorLoading || imageUploadLoading}
                onClick={handleUpdateProductColor}
              >
                {productColorLoading || imageUploadLoading ? (
                  <RefreshCcw className="w-3 h-3 animate-spin" />
                ) : (
                  " Update"
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Image
            src={`/products/${updatedProductColor.image}`}
            alt={updatedProductColor.image}
            className="object-cover rounded-md m-auto"
            width={500}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
