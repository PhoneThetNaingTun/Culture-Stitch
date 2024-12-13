"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppSelector } from "@/store/hooks";
import { SlidersHorizontal } from "lucide-react";
import FilterColorButton from "./filterColorButtons";
import FilterSizeButtons from "./filterSizeButtons";
import { usePathname, useRouter } from "next/navigation";

export default function FilterSheet() {
  const { colors } = useAppSelector((state) => state.Color);
  const { sizes } = useAppSelector((state) => state.Size);
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal /> Filter
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Filter</SheetTitle>
        <SheetDescription></SheetDescription>
        <div className="w-full flex justify-end">
          <Button
            onClick={() => {
              router.push(pathname);
            }}
          >
            Clear Filter
          </Button>
        </div>
        <FilterColorButton data={colors} title="Colors" Key="fc" />
        <FilterSizeButtons data={sizes} title="Sizes" Key="fs" />
      </SheetContent>
    </Sheet>
  );
}
