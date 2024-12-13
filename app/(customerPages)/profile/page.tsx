import React from "react";
import ProfilePageClient from "./_components/client";
import { auth } from "@/middleware";

async function ProfilePage() {
  return <ProfilePageClient />;
}

export default ProfilePage;
