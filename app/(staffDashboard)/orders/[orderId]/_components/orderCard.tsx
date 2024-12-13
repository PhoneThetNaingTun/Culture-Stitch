import Image from "next/image";

type orderItem = {
  id: string;
  color: string | undefined;
  image: string | undefined;
  size: string | undefined;
  productName: string | undefined;
  productPrice: number | undefined;
  quantity: number | undefined;
};
interface Prop {
  orderItem: orderItem;
}

export default function OrderCard({ orderItem }: Prop) {
  return (
    <div className="h-full flex flex-col gap-4 shadow-lg rounded-md">
      <div className=" w-full aspect-[4/5] overflow-hidden">
        <Image
          src={`/products/${orderItem.image}`}
          alt={orderItem.productName || ""}
          className="object-cover w-full h-full rounded-t-md "
          width={500}
          height={500}
        />
      </div>
      <div className=" font-roboto  flex flex-col gap-3 justify-between px-4 pb-4">
        <p className="text-xs font-semibold">{orderItem.productName}</p>
        <div>
          <div className="flex gap-3 items-center text-xs">
            <span>Color :</span>{" "}
            <span>
              <div
                style={{ backgroundColor: orderItem.color }}
                className="w-5 h-5 border border-black"
              />
            </span>
          </div>
          <p className="text-xs ">
            <span>Size :</span>
            <span className="ml-2 mt-1">{orderItem.size}</span>
          </p>
          <p className="text-xs ">
            <span>Price :</span>
            <span className="ml-2 mt-1">{orderItem.productPrice}Ks</span>
          </p>
        </div>
        <div className="flex justify-end">
          <p className=" bg-black text-white px-2 py-1 rounded-md">
            x{orderItem.quantity}
          </p>
        </div>
      </div>
    </div>
  );
}
