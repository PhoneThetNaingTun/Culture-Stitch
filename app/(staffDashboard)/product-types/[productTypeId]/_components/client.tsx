"use client";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { DeleteType, UpdateType } from "@/store/Slices/TypeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdateTypePayload } from "@/types/type";
import { RefreshCcw } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductTypeDetailPageClient() {
  const param = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { productTypeId } = param;

  const { types, typeLoading } = useAppSelector((state) => state.ProductType);

  const [updatedType, setUpdatedType] = useState<UpdateTypePayload>({
    id: productTypeId as string,
    type: "",
  });
  const type = types.find((item) => item.id === productTypeId);

  useEffect(() => {
    if (type) {
      setUpdatedType(type);
    }
  }, [type]);

  const handleUpdateType = () => {
    if (!updatedType.type || !updatedType.id) {
      return toast({
        title: "Please Fill Out All Fields!",
        variant: "destructive",
      });
    }
    dispatch(
      UpdateType({
        ...updatedType,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/product-types");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleDeleteType = () => {
    dispatch(
      DeleteType({
        id: productTypeId as string,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/product-types");
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
                <BreadcrumbLink href="/product-types">
                  Product Types
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Product Type Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-4">
        <div className="flex items-center justify-between">
          <p className="font-roboto font-semibold text-2xl">
            Product Type Details
          </p>
          <DeleteButtonDialog
            onDelete={handleDeleteType}
            loading={typeLoading}
            header="Product Type"
          />
        </div>
        <div className="w-full lg:w-1/2 mt-5">
          <Label htmlFor="typeInput">Product Type Name</Label>
          <Input
            id="typeInput"
            placeholder="Put product type name here"
            defaultValue={updatedType.type}
            disabled={typeLoading}
            onChange={(e) => {
              setUpdatedType({ ...updatedType, type: e.target.value });
            }}
          />
          <div className="mt-5 flex justify-end">
            <Button
              className="bg-green-500 hover:bg-green-700"
              disabled={typeLoading}
              onClick={handleUpdateType}
            >
              {typeLoading ? (
                <RefreshCcw className="w-3 h-3 animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
