"use client";
import ImageUpload from "@/components/image/imageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEdgeStore } from "@/lib/edgestore";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  description: z.string(),
});
type Props = {
  params: { lang: "fr" | "en"; category: string };
};
type TypeChema = z.infer<typeof schema>;
export default function Page({ params: { category } }: Props) {
  const [images, setImages] = useState<string[]>([]);

  const { edgestore } = useEdgeStore();

  const methods = useForm<TypeChema>({
    resolver: zodResolver(schema),
    defaultValues: { description: "", title: "" },
  });
  const updateImages = (newUrl: string) =>
    setImages((prev) => [...prev, newUrl]);
  const onSubmit = async (data: TypeChema) => {
    images.forEach((url) => edgestore.publicFiles.confirmUpload({ url }));

    //  await db.post.create({
    //     data: {
    //       description: data.description,
    //       title: data.title,
    //       images,
    //       category,
    //     },
    //   });
  };
  return (
    <form
      className="max-w-xl mx-auto flex flex-col items-center gap-3"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <FormProvider {...methods}>
        <Input label="Title" width="100%" id="title" />
        <Input label="Description" width="100%" id="description" />
        <ImageUpload updateImages={updateImages} />
        <div>
          {images.map((img) => (
            <Image src={img} key={img} alt="dds" width={400} height={200} />
          ))}
        </div>
      </FormProvider>
      <Button>Publish</Button>
    </form>
  );
}
