"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import ProfileTab from "./profileTab";
import { EditUserPayload } from "@/types/customerApp";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { EditUser } from "@/store/Slices/CustomerAppSlice";
import RecentOrderTab from "./RecentOrderTab";

export default function ProfilePageClient() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { user } = useAppSelector((state) => state.CustomerApp);
  const [signOutLoading, setSignoutLoading] = useState<boolean>(false);
  const [savedUser, setSavedUser] = useState<EditUserPayload>();
  useEffect(() => {
    if (user) {
      setSavedUser({
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
      });
    }
  }, [user]);
  const handleEditUser = () => {
    if (
      !savedUser?.id ||
      !savedUser.name ||
      !savedUser.email ||
      !savedUser.address ||
      !savedUser.phone
    ) {
      return toast({ title: "Fill out all fields", variant: "destructive" });
    }
    dispatch(
      EditUser({
        ...savedUser,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <div>
      <div
        className="h-screen flex justify-center items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.438),rgba(32, 32, 32, 0.438)),url("/profilepagemodel.jpg")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <p className="font-petit text-4xl md:text-5xl lg:text-8xl text-center text-white">
          Welcome <br /> {user.name}
        </p>
      </div>
      <Tabs defaultValue="profile" className="px-6 lg:px-28 3xl:px-96 mt-20">
        <TabsList className="">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="recent-order">Recent Order</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileTab
            savedUser={savedUser}
            setSavedUser={setSavedUser}
            signOutLoading={signOutLoading}
            setSingoutLoading={setSignoutLoading}
            onClick={handleEditUser}
          />
        </TabsContent>
        <TabsContent value="recent-order">
          <RecentOrderTab user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
