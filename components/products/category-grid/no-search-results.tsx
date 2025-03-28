import Link from "next/link";
import { ProductType } from "@/types/product-types";

type NoSearchResultsParams = {
    search: string | undefined;
    bestMatch: ProductType | null;
} 

const NoSearchResults = ({ search, bestMatch }: NoSearchResultsParams) => {
    return (
        <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-bold">No Results Found for &quot;{search}&quot;</h1>
            <h2 className="max-w-md text-2xl text-center text-neutral-500">
                Did you mean:&nbsp;
                <Link className='underline' href={`/all-products?search=${encodeURIComponent(bestMatch?.["clothing-name"] || '')}`}>
                    {bestMatch?.["clothing-name"]}
                </Link>?
            </h2>
        </div>
    );
};

export default NoSearchResults;