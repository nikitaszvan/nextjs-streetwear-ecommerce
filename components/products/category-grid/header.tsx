// External Libraries
import { SetStateAction, Dispatch } from "react";

// Presentation Layer
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// Constants
import { sortOptions } from "@/constants/product-constants";

type HeaderParams = {
    categorySlug: string;
    category: string;
    search?: string;
    onFilterChange: Dispatch<SetStateAction<string>>
};

const Header = ({ categorySlug, category, search, onFilterChange }: HeaderParams) => {
    return (
        <header className="justify-between flex">
            {categorySlug !== 'all-products' ? (
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold leading-none tracking-tight text-foreground">
                        {category}
                    </h1>
                    <span className="text-base md:text-lg font-semibold text-muted-foreground">Category</span>
                </div>
            ) : (
                <h1 className="text-2xl md:text-3xl font-bold leading-none tracking-tight text-foreground">
                    {!search ? 'All Products' : `Searching for "${search}"`}
                </h1>
            )}

            <Select onValueChange={(value) => onFilterChange(value)}>
                <SelectTrigger className="w-[10.5rem] my-auto flex md:hidden">
                    <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(sortOptions).map((option, index) =>
                        <SelectItem key={index} value={option[1].id}>{option[1].label}</SelectItem>
                    )}
                </SelectContent>
            </Select>
        </header>
    );
};

export default Header;