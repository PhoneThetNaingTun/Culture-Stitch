import { LoaderCircle } from "lucide-react";
import React from "react";

function CustomerPageLoading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <LoaderCircle className="animate-spin w-10 h-10" />
    </div>
  );
}

export default CustomerPageLoading;
