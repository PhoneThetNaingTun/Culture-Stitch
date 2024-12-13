"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FindProduct } from "@/lib/general";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { Sizes } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

interface Prop {
  data: Sizes[];
  title: string;
  Key: string;
}
export default function FilterSizeButtons({ data, title, Key }: Prop) {
  const { sizes } = useAppSelector((state) => state.Size);
  const searchParam = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParam.get(Key);
  return (
    <div className="mt-4">
      <p className="text-sm font-semibold">{title}</p>
      <Separator className="mb-3" />
      <div className="flex gap-4 flex-wrap">
        {data.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "rounded-sm ",
              selectedValue === item.id &&
                "bg-black text-white hover:bg-gray-700 hover:text-white"
            )}
            onClick={() => {
              FindProduct(item.id, Key, router, searchParam);
            }}
          >
            {item.size}
          </Button>
        ))}
      </div>
    </div>
  );
}
