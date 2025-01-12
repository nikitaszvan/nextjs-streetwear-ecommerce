"use client"

import * as React from "react";
import { cn } from "@/lib/utils";
import StreetwearLogo from "@/public/assets/svgs/streetwear-logo.svg";
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

interface MainNavigationProps {
    className?: string;
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Tops",
    href: "/shirts-top-men",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Outerwear",
    href: "/outerwear-top-men",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Bottoms",
    href: "/pants-bottom-men",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Footwear",
    href: "/shoes-men",
    description: "Visually or semantically separates content.",
  },
  {
    title: "All",
    href: "/all-products",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
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
}

export default function MainNavigation({className}: MainNavigationProps) {
  return (
    <NavigationMenu className={cn(
        "max-w-none gap-6 mx-auto flex w-full !px-[10%]",
        className
      )}>
        <Link href="/"><Image width="60" height="60" src={StreetwearLogo} alt="streetwear logo" /></Link>
        <NavigationMenuList className="mr-auto !bg-transparent !backdrop-blur-none">
            <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
                <StyledMenuLink label="New Arrivals"/>
            </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <StyledMenuLink label="Best Sellers"/>
            </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuTrigger className="!bg-transparent">Men&apos;s</NavigationMenuTrigger>
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
                    <Input placeholder="Search for products…" className="px-4 pr-8 bg-white" />
                    <MagnifyingGlassIcon className="-ml-6 w-4 h-4"/>
                </label>
            </div>
            <div className="h-6 w-6">
                <ShoppingBag />
            </div>
        </div>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
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
