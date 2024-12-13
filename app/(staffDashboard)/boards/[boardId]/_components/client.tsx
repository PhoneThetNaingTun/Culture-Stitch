"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import DeleteButtonDialog from "@/components/ui/delete-button-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/imageUpload";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useParams, useRouter } from "next/navigation";
import { UpdateBoardPayload } from "@/types/board";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { assetUpload } from "@/store/Slices/DashBoardAppSlice";
import { DeleteBoard, UpdateBoard } from "@/store/Slices/BoardSlice";
export default function BoardDetailPageClient() {
  const param = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { boardId } = param;
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState<File>();
  const { boards, boardLoading } = useAppSelector((state) => state.Boards);
  const { user, imageUploadLoading } = useAppSelector(
    (state) => state.DashBoardApp
  );
  const { staffAndAdmins } = useAppSelector((state) => state.StaffAndAdmin);
  const board = boards.find((item) => item.id === boardId);
  const [updateBoard, setUpdateBoard] = useState<UpdateBoardPayload>({
    id: "",
    label: "",
    image: "",
    userId: "",
  });
  const [createrOrUpdater, setCreaterOrUpdater] = useState<
    string | undefined | null
  >("");
  const handleUpdateBoard = () => {
    // Validate fields
    if (!updateBoard.id || !updateBoard.label || !updateBoard.image) {
      return toast({
        title: "Please fill out all fields!",
        variant: "destructive",
      });
    }

    if (imageFile) {
      // Handle image upload
      dispatch(
        assetUpload({
          file: imageFile,
          onSuccess: (image: string) => {
            // Update board data after successful image upload
            dispatch(
              UpdateBoard({
                ...updateBoard,
                image,
                onSuccess: (message: string) => {
                  toast({
                    title: message,
                    variant: "default",
                  });
                  router.push("/boards");
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
        UpdateBoard({
          ...updateBoard,
          onSuccess: (message: string) => {
            toast({ title: message, variant: "default" });
            router.push("/boards");
          },
          onError: (error: string) => {
            toast({ title: error, variant: "destructive" });
          },
        })
      );
    }
  };
  const handleDeleteBoard = () => {
    dispatch(
      DeleteBoard({
        id: boardId as string,
        onSuccess: (message: string) => {
          toast({
            title: message,
            variant: "default",
          });
          router.push("/boards");
        },
        onError: (error: string) => {
          toast({
            title: error,
            variant: "destructive",
          });
        },
      })
    );
  };
  useEffect(() => {
    if (user) {
      setUpdateBoard({ ...updateBoard, userId: user.id });
    }
  }, [user]);
  useEffect(() => {
    if (board) {
      setUpdateBoard(board);
      const createrOrUpdater = staffAndAdmins.find(
        (user) => user.id === board?.userId
      );
      setCreaterOrUpdater(createrOrUpdater?.name);
    }
  }, [board]);
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
                <BreadcrumbLink href="/boards">Board</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Board Detail</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-4">
        <div className="flex items-center justify-between">
          <p className="font-roboto font-semibold text-2xl">
            Edit Board Details
          </p>
          <DeleteButtonDialog
            onDelete={handleDeleteBoard}
            header="Board"
            loading={boardLoading}
          />
        </div>
        <div className="mt-5 flex flex-col lg:flex-row gap-6">
          <div className="lg:flex-1">
            <Label htmlFor="label" className="mb-3">
              Label
            </Label>
            <Input
              id="label"
              placeholder="Put Label Here"
              defaultValue={updateBoard?.label}
              onChange={(e) =>
                setUpdateBoard({ ...updateBoard, label: e.target.value })
              }
              disabled={boardLoading || imageUploadLoading}
            />
            <p className="mt-5">Image</p>
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
                onClick={() => setUpdateBoard({ ...updateBoard, image: "" })}
              >
                {updateBoard?.image}
                <span className="ml-2">
                  <X className="w-3 h-3" />
                </span>
              </Badge>
            )}
            <div className="flex items-center gap-2 mt-5">
              <Checkbox
                id="onDisplay"
                checked={updateBoard.onDisplay}
                onCheckedChange={(e: boolean) => {
                  setUpdateBoard({ ...updateBoard, onDisplay: e });
                }}
                disabled={boardLoading || imageUploadLoading}
              />
              <Label htmlFor="onDisplay" className="flex flex-col">
                On Display
                <span className="text-xs text-gray-500">
                  Once You check and update,this Image and Label will show in
                  the home page
                </span>
              </Label>
            </div>

            <div className="mt-4">
              <p>
                Creater/Updater Name:
                <span className="text-gray-600">{createrOrUpdater}</span>
              </p>
            </div>
            <div className="mt-5 flex justify-end">
              <Button
                className="bg-green-500 hover:bg-green-700"
                onClick={handleUpdateBoard}
                disabled={boardLoading || imageUploadLoading}
              >
                {boardLoading || imageUploadLoading ? (
                  <RefreshCcw className="w-3 h-3 animate-spin" />
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </div>
          <div className="lg:flex-1 flex justify-center items-center">
            <Image
              src={`/boards/${updateBoard.image}`}
              alt={updateBoard.image}
              className="object-cover rounded-md"
              width={500}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
