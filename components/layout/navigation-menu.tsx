"use client"

import { useState, forwardRef, useEffect, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
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
import { usePathname } from "next/navigation";
import { menuCategories } from "@/constants/product-constants";


const StyledMenuLink = ({ label }: { label: string }) => {
  return (
    <NavigationMenuLink
      className={cn(
        "!bg-transparent",
        navigationMenuTriggerStyle())}>
      {label}
    </NavigationMenuLink>
  )
};

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href }, ref) => {
  return (
    <li>
      <Link href={href!} legacyBehavior passHref>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </Link>
    </li>
  );
});

ListItem.displayName = "ListItem";

interface MainNavigationProps {
  className?: string;
}

const MainNavigation = ({ className }: MainNavigationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, cart: { totalItemCount }, dispatch } = useCart();
  const pathname = usePathname();

  const handleOpenCart = () => {
    dispatch({ type: 'SHOW_CART_PREVIEW', payload: false });
  };

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
      <Link href="/">
        <Image width="60" height="60" src="/assets/svgs/streetwear-logo.svg" alt="streetwear logo" />
      </Link>
      <NavigationMenuList className="mr-auto !bg-transparent !backdrop-blur-none">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <StyledMenuLink label="New Arrivals" />
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <StyledMenuLink label="Best Sellers" />
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="!bg-transparent">Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {menuCategories.map((cat) => (
                <ListItem
                  key={cat.title}
                  title={cat.title}
                  href={cat.href}
                >
                  {cat.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <StyledMenuLink label="SALE" />
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
            <MagnifyingGlassIcon className="-ml-6 w-4 h-4" />
          </label>
        </div>
        <div className="h-6 w-6 relative">
          <button onClick={() => pathname !== '/checkout' ? handleOpenCart() : window.location.reload()} type='button' className="outline-none">
            <ShoppingBag />
            {!isLoading &&
              <span className="absolute bottom-0 right-0 inline-flex h-5 w-5 translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 bg-white text-center text-xs">
                {totalItemCount}
              </span>
            }
          </button>
        </div>
      </div>
    </NavigationMenu>
  )
}

export default MainNavigation;

