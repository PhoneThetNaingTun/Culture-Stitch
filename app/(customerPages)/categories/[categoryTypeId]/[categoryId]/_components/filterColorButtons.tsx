"use client";

import qs from "query-string";

import { Colors, Sizes } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { FindProduct } from "@/lib/general";

interface Prop {
  data: Colors[];
  title: string;
  Key: string;
}

export default function FilterColorButton({ data, title, Key }: Prop) {
  const searchParam = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParam.get(Key);

  return (
    <div className="mt-4">
      <p className="text-sm font-semibold">{title}</p>
      <Separator className="mb-3" />
      <div className="flex gap-4 flex-wrap">
        {data.map((item) => (
          <div
            key={item.id}
            className={cn(
              "w-5 h-5 rounded-full border cursor-pointer",
              selectedValue === item.id && "border-black border-[2px]"
            )}
            style={{ backgroundColor: item.color }}
            onClick={() => {
              FindProduct(item.id, Key, router, searchParam);
            }}
          />
        ))}
      </div>
    </div>
  );
}
