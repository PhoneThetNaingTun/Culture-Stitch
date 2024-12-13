"use client";
import { ReactNode, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDashBoardApp } from "@/store/Slices/DashBoardAppSlice";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
interface Prop {
  children: ReactNode;
}

const staffDashboardLayout = ({ children }: Prop) => {
  const { init, dashboardAppSliceLoading } = useAppSelector(
    (state) => state.DashBoardApp
  );
  const { user } = useAppSelector((state) => state.DashBoardApp);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!init) {
      dispatch(fetchDashBoardApp());
    }
  }, [init]);

  return (
    <>
      {user ? (
        <>
          {user.role === "User" ? (
            <>{router.push("/")}</>
          ) : (
            <>
              {dashboardAppSliceLoading ? (
                <div className="flex justify-center items-center h-screen">
                  <LoaderCircle className="animate-spin w-10 h-10" />
                </div>
              ) : (
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarInset>
                    <div className=" p-4 pt-0">{children}</div>
                  </SidebarInset>
                </SidebarProvider>
              )}
            </>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <LoaderCircle className="animate-spin w-10 h-10" />
        </div>
      )}
    </>
  );
};

export default staffDashboardLayout;
