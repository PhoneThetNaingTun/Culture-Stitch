import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

function ContactUsPageClient() {
  return (
    <div className="px-6 lg:px-28 3xl:px-96">
      <div className="flex flex-col text-center items-center mt-10">
        <p className="font-sendFlower text-5xl ">How Can We Assist You?</p>
        <p className="font-roboto text-xl lg:w-1/2">
          Whether you’re looking for support or have a general question, we’re
          here to help. Contact us using the form, and our team will respond
          promptly.
        </p>
      </div>
      <div className="flex flex-col items-center gap-3 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 m-auto gap-10">
          <div>
            <p className="flex font-roboto items-center gap-3 font-semibold">
              <Phone /> Hot Line Number
            </p>
            <p>+959832048324090</p>
          </div>
          <div>
            <p className="flex font-roboto items-center gap-3 font-semibold">
              <MapPin />
              Address
            </p>
            <p>Mandalay , Myanmar</p>
          </div>
          <div>
            <p className="flex font-roboto items-center gap-3 font-semibold">
              <Mail />
              Email
            </p>
            <p>cultureStitch0fashion@gmail.com</p>
          </div>
        </div>
        <div className=" border p-5 rounded-md  w-full lg:w-1/2">
          <p className="text-center font-roboto text-lg lg:text-4xl font-semibold">
            Contact Us
          </p>
          <div className="px-2 lg:px-10 flex flex-col gap-3 m-auto">
            <div>
              <Label>Name</Label>
              <Input />
            </div>
            <div>
              <Label>Email</Label>
              <Input />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea />
            </div>
            <div className="flex justify-end">
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPageClient;
