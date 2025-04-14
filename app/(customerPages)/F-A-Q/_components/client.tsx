import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function FAQPageClient() {
  return (
    <div className="px-6 lg:px-28 3xl:px-96 my-36">
      <p className="text-center font-semibold text-3xl">FAQs</p>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-semibold">
            What is CultureStitch?
          </AccordionTrigger>
          <AccordionContent>
            CultureStitch is a men’s fashion brand that offers a wide range of
            styles, from classic to modern, to suit every personality and
            occasion.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="font-semibold">
            What payment method do you accept?
          </AccordionTrigger>
          <AccordionContent>
            We currently have cash on delivery!
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="font-semibold">
            What sizes do you offer?
          </AccordionTrigger>
          <AccordionContent>
            Our sizes range from S to XXL, and detailed size charts are
            available on each product page to help you find the perfect fit.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="font-semibold">
            What kind of fabrics do you use?
          </AccordionTrigger>
          <AccordionContent>
            We prioritize high-quality fabrics like cotton, wool, and blends to
            ensure durability and comfort.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
