"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
export default function Home() {
  const router = useRouter();
  return (
    <div
      className="h-screen flex justify-center items-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.438),rgba(32, 32, 32, 0.438)),url("/modelHomePage.jpg")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, ease: "easeInOut" }}
          className="font-michroma text-3xl text-center md:text-5xl lg:text-9xl text-white"
        >
          Culture Stitch
        </motion.p>
        <div className="flex justify-center mt-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, ease: "easeInOut" }}
          >
            <Button
              onClick={() => {
                router.push("/home");
              }}
              className="bg-white text-black p-6 px-7 rounded-full text-xl font-bold font-roboto hover:bg-gray-200 "
            >
              Shop Now
            </Button>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-2 w-full md:w-1/2 text-center">
        <p className="font-Luxurious text-xl lg:text-4xl text-white">
          From textiles to pottery, every item tells a story rooted in tradition
          and celebrates the art of handcrafting passed down through
          generations.
        </p>
      </div>
    </div>
  );
}
