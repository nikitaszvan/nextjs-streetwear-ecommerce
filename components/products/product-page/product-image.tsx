import Image from "next/image";

const ProductImage = ({ imageUrl, altText }: { imageUrl: string; altText: string }) => (
  <figure className="flex w-[80vh] aspect-square justify-center relative">
    <Image
      className="rounded-md group-hover:rotate hover-perspective bg-neutral-100 object-cover object-bottom transition-opacity group-hover:opacity-75"
      src={imageUrl}
      alt={altText}
      fill
    />
  </figure>
);

export default ProductImage;