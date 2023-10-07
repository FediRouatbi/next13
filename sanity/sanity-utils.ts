import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import { Project } from "@/sanity/t/project";

export async function getProjects(): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project"]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      url,
      content
    }`
  );
}
