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
import { Checkbox } from "@/components/ui/checkbox";
import DeleteButtonDialog from "@/components/ui/delete-button-dialog";
import { Input } from "@/components/ui/input";
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
import { DeleteProduct, UpdateProduct } from "@/store/Slices/ProductSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdateProductPayload } from "@/types/product";
import { RefreshCcw, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailPageClient() {
  const param = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { productId } = param;

  const { products, productLoading } = useAppSelector((state) => state.Product);
  const { productCategories } = useAppSelector(
    (state) => state.ProductCategory
  );
  const { imageUploadLoading } = useAppSelector((state) => state.DashBoardApp);
  const { types } = useAppSelector((state) => state.ProductType);

  const product = products.find((item) => item.id === productId);

  const [imageFile, setImageFile] = useState<File>();
  const [updatedProduct, setUpdatedProduct] = useState<UpdateProductPayload>({
    id: "",
    name: "",
    productCategoryId: "",
    typeId: "",
    image: "",
    isFeatured: false,
    price: 0,
  });
  useEffect(() => {
    if (product) {
      setUpdatedProduct(product);
    }
  }, [product]);

  const handleUpdateProduct = () => {
    if (
      !updatedProduct.name ||
      !updatedProduct.productCategoryId ||
      !updatedProduct.typeId ||
      !updatedProduct.id
    ) {
      return toast({
        title: "Please fill out all fields!",
        variant: "destructive",
      });
    }
    if (!updatedProduct.price) {
      return toast({
        title: "Product Price Cannot Be Zero",
        variant: "destructive",
      });
    }
    if (imageFile) {
      // Handle image upload
      dispatch(
        assetProductUpload({
          file: imageFile,
          onSuccess: (image: string) => {
            // Update board data after successful image upload
            dispatch(
              UpdateProduct({
                ...updatedProduct,
                image,
                onSuccess: (message: string) => {
                  toast({
                    title: message,
                    variant: "default",
                  });
                  router.push("/products");
                },
                onError: (error: string) => {
                  toast({
                    title: error,
                    variant: "destructive",
                  });
                },
              })
            );
          },
          onError: (error: string) => {
            toast({
              title: error,
              variant: "destructive",
            });
          },
        })
      );
    } else {
      // Update board directly if no new image
      dispatch(
        UpdateProduct({
          ...updatedProduct,
          onSuccess: (message: string) => {
            toast({ title: message, variant: "default" });
            router.push("/products");
          },
          onError: (error: string) => {
            toast({ title: error, variant: "destructive" });
          },
        })
      );
    }
  };
  const handleDeleteProduct = () => {
    dispatch(
      DeleteProduct({
        id: productId as string,
        onSuccess: (message: string) => {
          toast({ title: message, variant: "default" });
          router.push("/products");
        },
        onError: (error: string) => {
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
                <BreadcrumbPage>Product Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-4 flex flex-col  lg:flex-row gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-roboto font-semibold text-2xl">
              Product Details
            </p>
            <DeleteButtonDialog
              onDelete={handleDeleteProduct}
              loading={productLoading}
              header="Product"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="productNameInput">Product Name</Label>
              <Input
                id="productNameInput"
                placeholder="Put product name here"
                onChange={(e) => {
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  });
                }}
                defaultValue={updatedProduct.name}
                disabled={productLoading || imageUploadLoading}
              />
            </div>
            <div>
              <Label htmlFor="priceInput">Price</Label>
              <Input
                id="priceInput"
                placeholder="Price"
                type="number"
                onChange={(e) => {
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: Number(e.target.value),
                  });
                }}
                value={updatedProduct.price}
                disabled={productLoading || imageUploadLoading}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 my-3">
              <Checkbox
                id="featureCheckBox"
                onCheckedChange={(e: boolean) => {
                  setUpdatedProduct({ ...updatedProduct, isFeatured: e });
                }}
                checked={updatedProduct.isFeatured}
                disabled={productLoading || imageUploadLoading}
              />
              <Label htmlFor="featureCheckBox">
                Feature <br />
                <span className="text-sm text-gray-600">
                  Feature this will show in the home page of feature category
                </span>
              </Label>
            </div>

            <Label>Product Category</Label>
            <Select
              onValueChange={(e) => {
                setUpdatedProduct({
                  ...updatedProduct,
                  productCategoryId: e,
                });
              }}
              value={updatedProduct.productCategoryId || ""}
              disabled={productLoading || imageUploadLoading}
            >
              <SelectTrigger className="mb-3">
                <SelectValue placeholder="Choose Product Category" />
              </SelectTrigger>
              <SelectContent>
                {productCategories && productCategories.length > 0 ? (
                  productCategories.map((productCategory) => (
                    <SelectItem
                      value={productCategory.id}
                      key={productCategory.id}
                    >
                      {productCategory.categoryName}
                    </SelectItem>
                  ))
                ) : (
                  <span>Product Categories Not Found</span>
                )}
              </SelectContent>
            </Select>
            <Label>Product Type</Label>

            <Select
              onValueChange={(e) => {
                setUpdatedProduct({
                  ...updatedProduct,
                  typeId: e,
                });
              }}
              value={updatedProduct.typeId}
              disabled={productLoading || imageUploadLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose Product Type" />
              </SelectTrigger>
              <SelectContent>
                {types && types.length > 0
                  ? types.map((type) => (
                      <SelectItem value={type.id} key={type.id}>
                        {type.type}
                      </SelectItem>
                    ))
                  : "Product Type Not Found"}
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
                  setUpdatedProduct({ ...updatedProduct, image: "" })
                }
              >
                {updatedProduct?.image}
                <span className="ml-2">
                  <X className="w-3 h-3" />
                </span>
              </Badge>
            )}
            <div className="mt-5 flex justify-end">
              <Button
                className="bg-green-500 hover:bg-green-700"
                disabled={productLoading || imageUploadLoading}
                onClick={handleUpdateProduct}
              >
                {productLoading || imageUploadLoading ? (
                  <RefreshCcw className="w-3 h-3 animate-spin" />
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 ">
          <Image
            src={`/products/${updatedProduct.image}`}
            alt={updatedProduct.image}
            className="object-cover rounded-md m-auto"
            width={500}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
