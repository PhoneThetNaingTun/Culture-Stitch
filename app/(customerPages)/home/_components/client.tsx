"use client";
import ProductCard from "@/components/customerPage/productCard";
import { Board, Products } from "@prisma/client";
import { motion } from "motion/react";
import Image from "next/image";
import { EventCarousel } from "./EventCarousel";
import { Button } from "@/components/ui/button";
interface Prop {
  board: Board | null;
  featuredProducts: Products[];
}

export const HomePageClient = ({ board, featuredProducts }: Prop) => {
  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  return (
    <div className="3xl:px-96">
      <div
        className="w-full px-6 lg:px-28"
        style={{
          backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.438),rgba(32, 32, 32, 0.438)),url("${
            board ? `/boards/${board.image}` : ""
          }")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "calc(100vh - 70px)",
          backgroundAttachment: "fixed",
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
          variants={variants1}
          className="flex justify-center items-center  lg:items-end lg:justify-start h-full w-full lg:w-1/2"
        >
          <p className="font-major text-center lg:text-start text-white text-4xl lg:text-8xl">
            {board?.label}
          </p>
        </motion.div>
      </div>
      {featuredProducts.length > 0 ? (
        <div className=" px-6 lg:px-28 py-10 ">
          <p className="font-roboto text-2xl lg:text-4xl ml-2 border-b-2 border-black">
            Featured Products
          </p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 gap-4"
          >
            {featuredProducts.map((item) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ ease: "easeInOut" }}
              >
                <ProductCard data={item} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      ) : null}

      <div className="">
        <EventCarousel />
      </div>
      <div>
        <div className=" px-6 lg:px-28 py-10 ">
          <div className="flex flex-col-reverse lg:flex-row gap-4 justify-around items-center">
            <Image
              src={"/model4.jpg"}
              alt="model.jpg"
              width={500}
              height={500}
            />
            <div className="flex flex-col items-center gap-3">
              <p className="font-michroma text-2xl lg:text-4xl text-center">
                Crafted Connections: Bringing Global <br /> Inspirations to Your
                Wardrobe
              </p>
              <Button className="rounded-none w-fit text-xl px-10">
                Explore
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
