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
import { DeleteColor, UpdateColor } from "@/store/Slices/ColorSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdateColorPayload } from "@/types/color";
import { RefreshCcw } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ColorDetailPageClient() {
  const param = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const { colorId } = param;

  const { colors, colorLoading } = useAppSelector((state) => state.Color);
  const color = colors.find((item) => item.id === colorId);

  const [updatedColor, setUpdatedColor] = useState<UpdateColorPayload>({
    id: colorId as string,
    color: "",
  });

  useEffect(() => {
    if (color) {
      setUpdatedColor(color);
    }
  }, [color]);

  const handleUpdateColor = () => {
    if (!updatedColor.color || !updatedColor.id) {
      return toast({
        title: "Please fill out all fields!",
        variant: "destructive",
      });
    }
    dispatch(
      UpdateColor({
        ...updatedColor,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/colors");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleDeleteColor = () => {
    dispatch(
      DeleteColor({
        id: colorId as string,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/colors");
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
                <BreadcrumbLink href="/colors">Product Color</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Product Color Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-4">
        <div className="flex items-center justify-between">
          <p className="font-roboto font-semibold text-2xl">Color Details</p>
          <DeleteButtonDialog
            onDelete={handleDeleteColor}
            loading={colorLoading}
            header="Product Color"
          />
        </div>
        <div className="mt-5 flex flex-col gap-4 lg:flex-row">
          <div className="flex-1">
            <Label htmlFor="colorCodeInput">Color Code</Label>
            <Input
              id="colorCodeInput"
              placeholder="Please put only color code with hashtag eg.(#ffff)..."
              defaultValue={updatedColor.color}
              onChange={(e) => {
                setUpdatedColor({ ...updatedColor, color: e.target.value });
              }}
            />
            <div className="mt-5 flex justify-end">
              <Button
                className="bg-green-500 hover:bg-green-700"
                disabled={colorLoading}
                onClick={handleUpdateColor}
              >
                {colorLoading ? (
                  <RefreshCcw className="w-3 h-3 animate-spin" />
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </div>
          <div className="flex-1 ">
            <div
              className="w-[200px] h-[200px] rounded-lg border border-gray-600 m-auto"
              style={{ backgroundColor: updatedColor.color }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
