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
import { DeleteSize, UpdateSize } from "@/store/Slices/SizeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdateSizePayload } from "@/types/size";
import { RefreshCcw } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SizeDetailPageClient() {
  const param = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { sizeId } = param;
  const { toast } = useToast();

  const { sizes, sizeLoading } = useAppSelector((state) => state.Size);
  const [updatedSize, setUpdatedSize] = useState<UpdateSizePayload>({
    id: sizeId as string,
    size: "",
  });
  const size = sizes.find((item) => item.id === sizeId);

  useEffect(() => {
    if (size) {
      setUpdatedSize(size);
    }
  }, [size]);

  const handleUpdateSize = () => {
    if (!updatedSize.size || !updatedSize.id) {
      return toast({ title: "Fill out all fields!", variant: "destructive" });
    }
    dispatch(
      UpdateSize({
        ...updatedSize,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/sizes");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };

  const handleDeleteSize = () => {
    dispatch(
      DeleteSize({
        id: sizeId as string,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/sizes");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <div>
      {" "}
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
                <BreadcrumbLink href="/sizes">Product Sizes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Product Size Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-4">
        <div className="flex items-center justify-between">
          <p className="font-roboto font-semibold text-2xl">
            Product Size Details
          </p>
          <DeleteButtonDialog
            onDelete={handleDeleteSize}
            loading={sizeLoading}
            header="Product Size"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <Label htmlFor="sizeInput">Size</Label>
          <Input
            id="sizeInput"
            placeholder="Put Size Here"
            defaultValue={updatedSize.size}
            onChange={(e) => {
              setUpdatedSize({ ...updatedSize, size: e.target.value });
            }}
          />
          <div className="mt-5 flex justify-end">
            <Button
              className="bg-green-500 hover:bg-green-700"
              disabled={sizeLoading}
              onClick={handleUpdateSize}
            >
              {sizeLoading ? (
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
