"use client";

import { RefreshCcw, Trash } from "lucide-react";
import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { useState } from "react";

interface Prop {
  header: string;
  onDelete: () => void;
  loading: boolean;
}

export default function DeleteButtonDialog({
  header,
  onDelete,
  loading,
}: Prop) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-fit border bg-red-500 text-white hover:bg-red-700 hover:text-white"
          variant="ghost"
        >
          <Trash className="w-3 h-3 " />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogTitle>
          Are you sure you want to delete this {header}?
        </DialogTitle>
        <DialogDescription>This action cannot be undone!</DialogDescription>
        <div className="flex justify-between items-center">
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={onDelete}
            disabled={loading}
          >
            {loading ? (
              <RefreshCcw className="w-3 h-3 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
