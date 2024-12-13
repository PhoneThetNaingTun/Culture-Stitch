import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

interface Prop {
  title: string;
  number: string;
}

export default function OverViewCard({ title, number }: Prop) {
  return (
    <Card>
      <CardHeader className="text-xl font-semibold font-roboto">
        {title}
      </CardHeader>
      <CardContent className="font-roboto text-lg">{number}</CardContent>
    </Card>
  );
}
