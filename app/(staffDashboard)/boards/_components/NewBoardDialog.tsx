"use client";

import { ImageUpload } from "@/components/imageUpload";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CreateBoard } from "@/store/Slices/BoardSlice";
import { assetUpload } from "@/store/Slices/DashBoardAppSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NewBoardPayload } from "@/types/board";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Cross, CrossIcon, Plus, RefreshCcw, X } from "lucide-react";
import { useEffect, useState } from "react";

export const NewBoardDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const { user, imageUploadLoading } = useAppSelector(
    (state) => state.DashBoardApp
  );
  const { boardLoading } = useAppSelector((state) => state.Boards);
  const [newBoard, setNewBoard] = useState<NewBoardPayload>({
    label: "",
    image: "",
    userId: user.id,
  });
  const [imageFile, setImageFile] = useState<File>();
  const dispatch = useAppDispatch();
  const handleCreateBoard = () => {
    if (!newBoard.label || !newBoard.userId) {
      return toast({
        title: "Please Fill Out All Fields!",
        variant: "destructive",
      });
    }
    if (imageFile) {
      dispatch(
        assetUpload({
          file: imageFile,
          onSuccess: (image) => {
            newBoard.image = image;
            dispatch(
              CreateBoard({
                ...newBoard,
                onSuccess: (message) => {
                  toast({
                    title: message,
                    description: "Edit On Display To display in HomePage",
                    variant: "default",
                  });
                  setNewBoard({ ...newBoard, label: "", image: "" });
                  setImageFile(undefined);
                  setOpen(false);
                },
                onError: (error) => {
                  toast({
                    title: error,
                    variant: "destructive",
                  });
                },
              })
            );
          },
          onError: (error) => {
            toast({
              title: error,
              variant: "destructive",
            });
          },
        })
      );
    }
  };
  useEffect(() => {
    if (user) {
      setNewBoard({ ...newBoard, userId: user.id });
    }
  }, [user]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add New Board
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogTitle>Add New Board</DialogTitle>
        <DialogDescription>
          Adding this board here will show at the home page
        </DialogDescription>
        <div>
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            placeholder="Label Here"
            onChange={(e) => {
              setNewBoard({ ...newBoard, label: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateBoard();
              }
            }}
          />
          <ImageUpload onDrop={(files) => setImageFile(files[0])} />
          {imageFile && (
            <Badge
              className="bg-gray-300 text-black flex items-center w-fit mt-2"
              onClick={() => setImageFile(undefined)}
            >
              {imageFile.name}
              <span className="ml-2">
                <X className="w-3 h-3" />
              </span>
            </Badge>
          )}
          <div className=" mt-4">
            <Button
              className="w-full"
              onClick={handleCreateBoard}
              disabled={imageUploadLoading || boardLoading}
            >
              {imageUploadLoading || boardLoading ? (
                <RefreshCcw className="w-3 h-3 animate-spin" />
              ) : (
                "Create New Board"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
