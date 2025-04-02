"use client"
// Service Layer
import { cn } from "@/lib/utils/classname-utils";

// External Libraries
import { Circle } from 'lucide-react';

// Constants
import { sortOptions } from "@/constants/product-constants";

interface ProductsFilterProps {
  onFilterChange: (value: string) => void;
  selectedSort: string;
}

const ProductsFilter = ({ onFilterChange, selectedSort }: ProductsFilterProps) => {

  return (
    <div className="flex flex-col py-4 small:px-0 pl-6 min-w-[250px] small:ml-[1.675rem] h-fit sticky top-[6rem] hidden md:block">
      <h3 className="font-normal font-sans text-medium text-[#9ca3af] mb-2">Sort by</h3>
      <div className="flex flex-col gap-1">
        {sortOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onFilterChange(option.id)}
            className={cn(
              "flex transition-colors",
              selectedSort === option.id ? "text-primary ml-[-0.75rem]" : "text-muted-foreground"
            )}
          >
            <label className="flex gap-x-2 items-center text-left text-base hover:text-primary font-sans text-md font-normal !txt-compact-small !transform-none text-ui-fg-subtle hover:cursor-pointer" htmlFor="button">{selectedSort === option.id && <Circle className="w-1 h-1 fill-current" />}{option.label}</label>
          </button>
        ))}
      </div>
    </div>
  )
};

export default ProductsFilter;

