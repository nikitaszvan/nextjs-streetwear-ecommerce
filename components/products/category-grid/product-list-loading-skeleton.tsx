import { Skeleton } from "@/components/ui/skeleton";

const ProductListLoadingSkeleton = () => {
  return (
    <ul
      className="mt-6 grid grid-cols-1 gap-8 gap-y-[6rem] lg:grid-cols-2 xl:grid-cols-3 w-full xl:pr-12"
      aria-busy="true"
      aria-label="Loading product list"
    >
      {Array.from({ length: 9 }).map((_, index) => (
        <li key={index} aria-hidden="true">
          <Skeleton className="relative rounded-lg aspect-square w-full overflow-hidden bg-neutral-100 max-w-sm min-w-[16rem]" />
        </li>
      ))}
    </ul>
  );
};

export default ProductListLoadingSkeleton;