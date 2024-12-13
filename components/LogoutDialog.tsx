"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

function LogoutDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-500 hover:bg-red-700">
          <LogOut /> Logout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>Are you sure you want to logout?</DialogHeader>
        <DialogDescription>This action cannot be undeone!</DialogDescription>
        <div className="flex justify-between">
          <Button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-700"
          >
            Logout
          </Button>
          <DialogClose>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutDialog;
