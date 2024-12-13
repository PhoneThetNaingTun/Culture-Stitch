"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function EventCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  const Images = [
    { id: 1, image: "/carouselModel1.jpg" },
    { id: 2, image: "/carouselModel2.jpg" },
    { id: 3, image: "/carouselModel3.jpg" },
  ];

  return (
    <Carousel plugins={[plugin.current]} className="w-full">
      <CarouselContent>
        {Images.map((item, index) => {
          return (
            <CarouselItem key={index} className="w-full h-[300px] md:h-screen">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="absolute top-1/2 left-2 flex items-center justify-center">
        <CarouselPrevious className="relative left-0 translate-x-0 hover:translate-x-0 " />
      </div>
      <div className="absolute top-1/2 right-2 flex items-center justify-center">
        <CarouselNext className="relative right-0 translate-x-0 hover:translate-x-0 " />
      </div>
    </Carousel>
  );
}
