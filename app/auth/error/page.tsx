import { LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";

function ErrorPage() {
  return (
    <div className="bg-white shadow-md p-10 rounded-md text-center">
      <span className="font-semibold text-3xl mb-4">
        Something Went Wrong :({" "}
      </span>
      <br />
      <Link
        href={"auth/login"}
        className="flex justify-center items-center gap-1"
      >
        Back to Login <LogIn className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default ErrorPage;
