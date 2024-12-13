//@ts-nocheck

import LogoutDialog from "@/components/LogoutDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditUserPayload } from "@/types/customerApp";
import { LogOut, RefreshCcw, Save } from "lucide-react";
import { signOut } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";

interface Prop {
  signOutLoading: boolean;
  setSingoutLoading: Dispatch<SetStateAction<boolean>>;
  onClick: () => void;
  savedUser?: EditUserPayload;
  setSavedUser: Dispatch<SetStateAction<EditUserPayload | undefined>>;
}

export default function ProfileTab({
  signOutLoading,
  setSingoutLoading,
  onClick,
  savedUser,
  setSavedUser,
}: Prop) {
  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-20 py-20">
        <div>
          <Label className="font-rooboto font-semibold text-2xl">Name</Label>
          <Input
            defaultValue={savedUser?.name as string}
            placeholder="Enter Name"
            className="rounded-none border-x-0 border-t-0 border-b-2 border-black shadow-none focus-visible:ring-0"
            disabled={signOutLoading}
            onChange={(e) => {
              setSavedUser({ ...savedUser, name: e.target.value });
            }}
          />
        </div>
        <div>
          <Label className="font-rooboto font-semibold text-2xl">Email</Label>
          <Input
            defaultValue={savedUser?.email as string}
            disabled={signOutLoading}
            placeholder="Enter Email"
            className="rounded-none border-x-0 border-t-0 border-b-2 border-black shadow-none focus-visible:ring-0"
            readOnly
          />
        </div>
        <div>
          <Label className="font-rooboto font-semibold text-2xl">Phone</Label>
          <Input
            defaultValue={savedUser?.phone || ""}
            disabled={signOutLoading}
            placeholder="Enter Phone"
            className="rounded-none border-x-0 border-t-0 border-b-2 border-black shadow-none focus-visible:ring-0"
            onChange={(e) => {
              setSavedUser({ ...savedUser, phone: e.target.value });
            }}
          />
        </div>
        <div>
          <Label className="font-rooboto font-semibold text-2xl">Address</Label>
          <Input
            defaultValue={savedUser?.address || ""}
            disabled={signOutLoading}
            placeholder="Enter Address"
            className="rounded-none border-x-0 border-t-0 border-b-2 border-black shadow-none focus-visible:ring-0"
            onChange={(e) => {
              setSavedUser({ ...savedUser, address: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="flex justify-end items-end gap-4">
        <Button
          onClick={onClick}
          className="px-10 rounded-sm "
          disabled={signOutLoading}
        >
          <Save /> Save
        </Button>
        <LogoutDialog />
      </div>
    </div>
  );
}
