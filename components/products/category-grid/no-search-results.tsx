import Link from "next/link";
import { ProductType } from "@/types/product-types";

type NoSearchResultsParams = {
  search: string | undefined;
  bestMatch: ProductType | null;
};

const NoSearchResults = ({ search, bestMatch }: NoSearchResultsParams) => {
  return (
    <section
      className="flex h-[60vh] w-full flex-col items-center justify-center gap-4"
      aria-labelledby="no-results-heading"
    >
      <h1 id="no-results-heading" className="text-2xl font-bold">
        No Results Found for &quot;{search}&quot;
      </h1>
      {bestMatch && (
        <h2 className="max-w-md text-xl text-center text-neutral-500">
          Did you mean:&nbsp;
          <Link
            className="underline text-blue-600 hover:text-blue-800"
            href={`/all-products?search=${encodeURIComponent(
              bestMatch["clothing-name"]
            )}`}
          >
            {bestMatch["clothing-name"]}
          </Link>
          ?
        </h2>
      )}
    </section>
  );
};

export default NoSearchResults;