"use client";

import { easeInOut, motion } from "motion/react";

export default function AboutUsPageClient() {
  return (
    <div>
      <div
        className="w-full px-6 lg:px-28"
        style={{
          backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.438),rgba(32, 32, 32, 0.438)),url("/model 7.jpg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "calc(100vh - 70px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col justify-center items-center lg:items-start   lg:justify-center h-full w-full lg:w-1/2 font-roboto font-thin text-center lg:text-start text-white"
        >
          <p className=" text-4xl lg:text-8xl">About Us</p>
          <p className="">
            To combine style, comfort, and local heritage into a fashion
            experience for all
          </p>
        </motion.div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row h-screen mt-40">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, ease: "easeInOut" }}
          className="flex-1"
          style={{
            backgroundImage: `url("/model5.jpg")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="flex-1 text-center l h-full flex justify-center items-center flex-col">
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, ease: "easeInOut" }}
            className="font-semibold text-xl lg:text-4xl mb-5"
          >
            Our Vision and Values
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, ease: "easeInOut" }}
            className="w-2/3 text-xs lg:text-xl"
          >
            At CultureStitch, we believe fashion should be accessible to all
            men, regardless of age, personality, or style preference. Our
            collection features a diverse range of designs, catering to both
            classic, refined tastes and modern, relaxed style.
          </motion.p>
        </div>
      </div>
      <div className="bg-[#EBEBEB] px-6 lg:px-28 flex items-center mt-10 h-screen">
        <div className="font-roboto">
          {" "}
          <p className="text-[#790800] text-2xl lg:text-5xl mb-3">
            Lookin Forward
          </p>
          <p className="text-3xl my-3">
            Our dedication to quality, community, and culture remains
            unwavering. Whether you’re a long-time supporter or a new visitor,
            we’re here to bring you an exceptional fashion experience.
          </p>
          <p className="text-xs md:text-lg">
            CultureStitch is a locally-owned apparel brand, stitching together
            fashion, comfort, and economy-just the best of each for our
            community. It is located in Mandalay, Myanmar. CultureStitch is a
            locally-owned apparel company that is recognized by its modern
            style, high-quality products, and handmade items. At the moment,
            though, the company does not have an assigned website for marketing
            or selling its products online. Without such a website, it cannot
            expand to reach a wider audience or build a customer base other than
            the local shoppers. Living in the present digital times, the brand
            growth and visibility online becomes key. CultureStitch would wish
            to fill this gap through developing an online storefront where
            clients can go through, purchase, and interact with their products
            with ease. The website, due to increasing demands for purchases over
            the web, will be serving the needs of the brand by portraying its
            unique collections and reaching customers within diverse
            geographical boundaries for the convenience of shoppers.
          </p>
        </div>
      </div>
    </div>
  );
}
