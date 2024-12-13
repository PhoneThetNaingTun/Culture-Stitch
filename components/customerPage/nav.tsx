"use client";
import { cn } from "@/lib/utils";
import { AlignJustify, ShoppingBag, User } from "lucide-react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppSelector } from "@/store/hooks";
import React from "react";
import CartSheet from "./cartSheet";
import { usePathname } from "next/navigation";
import { TotalQuantity } from "@/lib/general";
import { Separator } from "../ui/separator";
export default function NavBar() {
  const pathname = usePathname();
  const { items } = useAppSelector((state) => state.AddToCart);
  const { productCategories } = useAppSelector(
    (state) => state.ProductCategory
  );
  const { categoryTypes } = useAppSelector((state) => state.CategoryType);
  const navCategories = categoryTypes.map((item) => {
    const id = item.id;
    const categoryType = item.categroyTypeName;
    const categoryName = productCategories.filter(
      (category) => category.categoryTypeId === item.id
    );
    return { id, categoryType, categoryName };
  });

  const nav = [
    {
      id: 1,
      name: "Home",
      href: "/home",
      isActive: pathname.includes("/home"),
    },
    {
      id: 4,
      name: "Categories",
      href: "",
      isActive: pathname.includes("/categories"),
    },
    {
      id: 2,
      name: "About Us",
      href: "/about-us",
      isActive: pathname.includes("/about-us"),
    },
    {
      id: 3,
      name: "Contact Us",
      href: "/contact-us",
      isActive: pathname.includes("/contact-us"),
    },
  ];

  return (
    <div className="sticky top-0   z-[1]">
      <div className="hidden xl:flex justify-between px-28 items-center 3xl:px-96 h-[70px] bg-white shadow-md">
        <div>
          <Link href={"/home"} className="font-rubik text-2xl">
            Culture Stitch
          </Link>
        </div>
        <div className="flex items-center gap-20">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-10 font-roboto">
              {nav.map((item) => (
                <div key={item.id}>
                  {" "}
                  {item.name === "Categories" ? (
                    <NavigationMenuItem key={item.id}>
                      <NavigationMenuTrigger className="font-normal">
                        Categories
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                          {navCategories.map((item) => {
                            return (
                              <div key={item.id}>
                                <Link
                                  href={`/categories/${item.id}`}
                                  className="font-roboto  font-semibold hover:text-gray-700"
                                >
                                  {item.categoryType}
                                </Link>
                                <div>
                                  {item.categoryName.map((category) => (
                                    <ListItem
                                      key={category.id}
                                      title={category.categoryName}
                                      href={`/categories/${item.id}/${category.id}`}
                                    ></ListItem>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem
                      key={item.id}
                      className={
                        item.isActive
                          ? " border-b-[1px] border-black"
                          : " relative text-black cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
                      }
                    >
                      <Link href={item.href}>{item.name}</Link>
                    </NavigationMenuItem>
                  )}
                </div>
              ))}
              <NavigationMenuItem>
                <Link
                  href={"/profile"}
                  className="flex flex-col items-center text-xs font-semibold"
                >
                  <User className="w-7 h-7" />
                  profile
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="relative">
                <CartSheet />

                {items.length === 0 ? null : (
                  <span className="absolute -top-3 -right-3 bg-red-600 text-white px-2 rounded-full select-none">
                    {TotalQuantity(items)}
                  </span>
                )}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="flex xl:hidden justify-between px-6 lg:px-28 items-center h-[70px] bg-white shadow-md">
        <div>
          <Link href={"/home"} className="font-rubik ">
            Culture Stitch
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <AlignJustify className="cursor-pointer" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <Link href={"/home"} className="font-rubik">
                    Culture Stitch
                  </Link>
                </SheetTitle>
                <NavigationMenu>
                  <NavigationMenuList className="flex flex-col items-start gap-10 font-roboto">
                    <NavigationMenuItem>
                      <Link href={"/home"}>Home</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Sheet>
                        <SheetTrigger>Categories</SheetTrigger>
                        <SheetContent>
                          <SheetHeader className="font-semibold">
                            Categories
                          </SheetHeader>
                          <ul className="flex flex-col mt-3">
                            {navCategories.map((item) => {
                              return (
                                <div key={item.id}>
                                  <Link
                                    href={`/categories/${item.id}`}
                                    className="font-roboto font-semibold hover:text-gray-700"
                                  >
                                    {item.categoryType}
                                  </Link>
                                  <div>
                                    {item.categoryName.map((category) => (
                                      <ListItem
                                        key={category.id}
                                        title={category.categoryName}
                                        href={`/categories/${item.id}/${category.id}`}
                                      ></ListItem>
                                    ))}
                                  </div>
                                  <Separator />
                                </div>
                              );
                            })}
                          </ul>
                        </SheetContent>
                      </Sheet>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href={"/about-us"}>About Us</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href={"/contact-us"}>Contact Us</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link
                        href={"/profile"}
                        className="flex items-center gap-3"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href={"/cart"}>
                  <ShoppingBag className="w-7 h-7" />
                  {items.length === 0 ? null : (
                    <span className="absolute -top-3 -right-3 bg-red-600 text-white px-2 rounded-full select-none">
                      {TotalQuantity(items)}
                    </span>
                  )}
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
