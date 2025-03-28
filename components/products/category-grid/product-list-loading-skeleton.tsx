import { Skeleton } from "@/components/ui/skeleton";

const ProductListLoadingSkeleton = () => {
  return (
    <ul className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: 9 }).map((_, index) => (
        <li key={index}>
          <Skeleton className="aspect-square rounded-lg w-full h-full"/>
        </li>
      ))}
    </ul>
  );
};

export default ProductListLoadingSkeleton;