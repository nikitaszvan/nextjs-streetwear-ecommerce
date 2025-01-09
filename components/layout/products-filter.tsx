'use client'

import { cn } from "@/lib/utils";
import { ArrowDown, ArrowRight, Circle } from 'lucide-react';
import { useState } from "react";

export default function SortMenu() {
  const [selectedSort, setSelectedSort] = useState<string>('latest')

  const sortOptions = [
    { id: 'latest', label: 'Latest Arrivals' },
    { id: 'price-asc', label: 'Price: Low → High' },
    { id: 'price-desc', label: 'Price: High → Low' },
  ]

  return (
    <div className="flex flex-col py-4 small:px-0 pl-6 min-w-[250px] small:ml-[1.675rem] h-fit sticky top-[6rem]">
      <h3 className="font-normal font-sans text-medium text-[#9ca3af] mb-2">Sort by</h3>
      <div className="flex flex-col gap-1">
        {sortOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => {
              setSelectedSort(option.id)
              // Add your sorting logic here
              switch (option.id) {
                case 'latest':
                  // Handle latest arrivals sorting
                  break
                case 'price-asc':
                  // Handle price low to high sorting
                  break
                case 'price-desc':
                  // Handle price high to low sorting
                  break;
              }
            }}
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
}

