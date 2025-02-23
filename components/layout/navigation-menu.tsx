"use client"

import { useState, forwardRef, useEffect, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import StreetwearLogo from "@/public/assets/svgs/streetwear-logo.svg";
import { useRouter, useSearchParams } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { ShoppingBag } from 'lucide-react';
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

interface MainNavigationProps {
    className?: string;
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Tops",
    href: "/shirts-top-men",
    description:
      "Oversized tees and hoodies with bold graphics and boxy fits.",
  },
  {
    title: "Outerwear",
    href: "/outerwear-top-men",
    description:
      "Bombers and puffers in bold colors and collabs.",
  },
  {
    title: "Bottoms",
    href: "/pants-bottom-men",
    description:
      "Cargo pants and baggy jeans with utility features.",
  },
  {
    title: "Footwear",
    href: "/shoes-men",
    description: "Limited sneakers and chunky trainers in rare colorways.",
  },
  {
    title: "All",
    href: "/all-products",
    description:
      "Urban comfort with bold graphics and loose fits.",
  },
]

const StyledMenuLink = ({label}: {label: string }) => {
  return (
    <NavigationMenuLink 
      className={cn(
        "!bg-transparent",
        navigationMenuTriggerStyle())}>
      {label}
    </NavigationMenuLink>
  )
};


export default function MainNavigation({className}: MainNavigationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, cart: { totalItemCount }} = useCart();


  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);

    router.push(newQuery.length > 0 ? `/all-products?search=${encodeURIComponent(newQuery)}` : "/all-products");
  };

  return (
    <NavigationMenu className={cn(
        "max-w-none gap-6 mx-auto flex w-full !px-[10%]",
        className
      )}>
        <Link href="/"><Image width="60" height="60" src={StreetwearLogo} alt="streetwear logo" /></Link>
        <NavigationMenuList className="mr-auto !bg-transparent !backdrop-blur-none">
            <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
                <StyledMenuLink label="New Arrivals"/>
            </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <StyledMenuLink label="Best Sellers"/>
            </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuTrigger className="!bg-transparent">Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                        <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                        >
                        {component.description}
                        </ListItem>
                    ))}
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                <StyledMenuLink label="SALE"/>
                </Link>
            </NavigationMenuItem>
      </NavigationMenuList>
        <div className="flex items-center ml-auto">
            <div className="mr-5 ml-auto sm:ml-0">
                <label className="flex items-center">
                    <span className="sr-only">Search</span>
                    <Input 
                      maxLength={36} 
                      value={searchQuery}
                      onChange={handleSearch} 
                      placeholder="Search for products…" 
                      className="px-4 pr-8 bg-white" 
                    />
                    <MagnifyingGlassIcon className="-ml-6 w-4 h-4"/>
                </label>
            </div>
            <div className="h-6 w-6 relative">
                <ShoppingBag />
                {!isLoading && 
                  <span className="absolute bottom-0 right-0 inline-flex h-5 w-5 translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 bg-white text-center text-xs">
                    {totalItemCount}
                  </span>
                }
            </div>
        </div>
    </NavigationMenu>
  )
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
