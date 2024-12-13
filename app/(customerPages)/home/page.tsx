import { prisma } from "@/lib/prisma";
import { HomePageClient } from "./_components/client";

const HomePage = async () => {
  const board = await prisma.board.findFirst({ where: { onDisplay: true } });
  const featuredProducts = await prisma.products.findMany({
    where: { isFeatured: true },
  });
  return <HomePageClient board={board} featuredProducts={featuredProducts} />;
};

export default HomePage;
