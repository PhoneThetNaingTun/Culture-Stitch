"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { CreateReview } from "@/store/Slices/ReviewSlice";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { RefreshCcw } from "lucide-react";

function Footer() {
  const footerNav = [
    {
      name: "Our Company",
      links: [
        { linkName: "About Us", href: "/about-us" },
        { linkName: "Contact Us", href: "/contact-us" },
      ],
    },
    {
      name: "Help",
      links: [
        { linkName: "FAQs", href: "/F-A-Q" },
        { linkName: "Orders", href: "/order" },
      ],
    },
  ];

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { categoryTypes } = useAppSelector((state) => state.CategoryType);
  const { user } = useAppSelector((state) => state.CustomerApp);
  const { reviewLoading } = useAppSelector((state) => state.Review);
  const [review, setReview] = useState<string>("");

  const handleCreateReviews = () => {
    if (!review) {
      return toast({
        title: "Please fill up the input!",
        variant: "destructive",
      });
    }
    if (!user || Object.keys(user).length === 0) {
      router.push("/auth/login");
      return;
    }

    dispatch(
      CreateReview({
        userId: user.id,
        review,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setReview("");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <div className="bg-black pt-5 mt-10 relative ">
      <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] w-full z-0 select-none">
        <p className="text-white opacity-10 font-rubik text-2xl md:text-4xl lg:text-9xl text-center p-0">
          Culture Stitch
        </p>
      </div>

      <p className="text-center text-white text-3xl font-roboto font-semibold">
        Join Our Journy
      </p>
      <div className="lg:px-28 px-6 mt-10 lg:mt-28  flex flex-col gap-5 justify-between lg:flex-row ">
        <div className=" flex-row gap-32  lg:flex flex-1 z-10">
          <div>
            <p className="text-foreground text-gray-500 mb-5"> Categories</p>
            <div className="flex flex-col text-sm">
              {categoryTypes.map((item) => (
                <Link
                  href={`/categories/${item.id}`}
                  key={item.id}
                  className="text-white mb-2"
                >
                  {item.categroyTypeName}
                </Link>
              ))}
            </div>
          </div>
          {footerNav.map((item) => {
            return (
              <div key={item.name}>
                <p className="text-foreground text-gray-500 mb-5">
                  {" "}
                  {item.name}
                </p>
                <div className="flex flex-col text-sm ">
                  {item.links.map((link) => (
                    <Link
                      href={`${link.href}`}
                      key={link.href}
                      className="text-white mb-2"
                    >
                      {link.linkName}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-1 z-10">
          <p className="font-roboto text-white text-2xl font-semibold text-center lg:text-start">
            Give Us Reviews
          </p>
          <Input
            className="bg-transparent border-b-1 border-white border-x-0 border-t-0 focus-visible:ring-0 text-white rounded-none"
            onChange={(e) => setReview(e.target.value)}
          />
          <div className="mt-3 flex justify-end">
            <Button
              disabled={reviewLoading}
              className="bg-white text-black hover:bg-gray-300 transition-transform duration-700 hover:text-black"
              onClick={handleCreateReviews}
            >
              {reviewLoading ? (
                <RefreshCcw className="w-4 h-4 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className=" w-full justify-center mt-32 lg:mt-20 pb-5">
        <p className="text-center font-roboto text-white text-sm">
          &copy; 2023-2024 CultureStitch All Right Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
