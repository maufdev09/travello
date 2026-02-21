import type { StaticImageData } from "next/image";

export interface Destination {
  location: string;
  title: string;
  description: string;
  price: string;
  image: string | StaticImageData;
}
