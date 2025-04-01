"use client"

import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScrollLock } from '@/lib/hooks/use-scroll-lock';
import { cn } from "@/lib/utils/classname-utils";
import { ChangeEvent } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type MobileSearchInputParams = {
  className?: string;
  maxSearchLength: number;
  searchValue: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const MobileSearchInput = ({
  className,
  maxSearchLength,
  searchValue,
  handleSearch
}: MobileSearchInputParams) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }

    window.addEventListener("keydown", handleEsc)

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [])

  useScrollLock(isOpen);

  return (
    <div className={cn("", className)}>
      <Button
        variant="ghost"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        <MagnifyingGlassIcon className="!h-6 !w-6 !p-0" />
      </Button>
      <div
        className={`fixed inset-0 flex flex-col bg-background transition-transform duration-300 ease-in-out z-overlay ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="relative flex-1 max-w-md mx-auto">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 w-full"
              type="search"
              maxLength={maxSearchLength}
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
          <Button variant="ghost" size="icon" className="ml-2" onClick={() => setIsOpen(false)} aria-label="Close menu">
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
};

export default MobileSearchInput;

