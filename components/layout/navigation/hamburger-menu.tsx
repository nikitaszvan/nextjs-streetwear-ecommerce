// "use client"

// import { useState, useEffect } from "react";
// import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useScrollLock } from '@/lib/hooks/use-scroll-lock';
// import { cn } from "@/lib/utils/classname-utils";
// import { categoriesRef } from "@/constants/product-constants";

// type HamburgerMenuParams = {
//     className?: string;
// }

// const HamburgerMenu = ({
//     className,
// }: HamburgerMenuParams) => {
//     const [isOpen, setIsOpen] = useState<boolean>(false)

//     useEffect(() => {
//         const handleEsc = (event: KeyboardEvent) => {
//             if (event.key === "Escape") setIsOpen(false)
//         }

//         window.addEventListener("keydown", handleEsc)

//         return () => {
//             window.removeEventListener("keydown", handleEsc)
//         }
//     }, [])

//     useScrollLock(isOpen);

//     return (
//         <div className={cn("", className)}>
//             <Button
//                 variant="ghost"
//                 className="relative !hover:bg-white"
//                 onClick={() => setIsOpen(!isOpen)}
//                 aria-expanded={isOpen}
//                 aria-label="Toggle menu"
//             >
//                 <Menu className="!h-6 !w-6 !p-0" />
//             </Button>
//             <div
//                 className={`fixed inset-0 flex flex-col bg-background transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
//                     }`}
//             >
//                 <div className="flex items-center justify-between p-4 border-b">
//                     <div className="relative flex-1 max-w-md mx-auto">

//                     </div>
//                     <Button variant="ghost" size="icon" className="ml-2" onClick={() => setIsOpen(false)} aria-label="Close menu">
//                         <X className="h-6 w-6" />
//                     </Button>
//                 </div>
//                 <nav className="flex-1 p-4 bg-white">
//                     <ul className="space-y-4 text-xl">
//                         <li>
//                             <a
//                                 href="#"
//                                 className="block p-2 hover:bg-muted rounded-md transition-colors"
//                                 onClick={() => setIsOpen(false)}
//                             >
//                                 Home
//                             </a>
//                         </li>
//                         <li>
//                             <a
//                                 href="#"
//                                 className="block p-2 hover:bg-muted rounded-md transition-colors"
//                                 onClick={() => setIsOpen(false)}
//                             >
//                                 New Arrivals
//                             </a>
//                         </li>
//                         <li>
//                             <a
//                                 href="#"
//                                 className="block p-2 hover:bg-muted rounded-md transition-colors"
//                                 onClick={() => setIsOpen(false)}
//                             >
//                                 Best Sellers
//                             </a>
//                         </li>
//                         <li>
//                             <strong
//                             >
//                                 Categories
//                             </strong>
//                         </li>
//                         {Object.entries(categoriesRef).map((cat, index) => {
//                             return (
//                                 <li key={index}>
//                                     <a
//                                         href="#"
//                                         className="block p-2 hover:bg-muted rounded-md transition-colors"
//                                         onClick={() => setIsOpen(false)}
//                                     >
//                                         {cat[1]}
//                                     </a>
//                                 </li>
//                             )
//                         })}
//                     </ul>
//                 </nav>
//             </div>
//         </div>
//     )
// };

// export default HamburgerMenu;

"use client"

import { useState, useEffect } from "react";
import { Menu, MenuIcon, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollLock } from '@/lib/hooks/use-scroll-lock';
import { cn } from "@/lib/utils/classname-utils";
import { categoriesRef, featuredCategories } from "@/constants/product-constants";
import { useWindowWidth } from "@/lib/hooks/use-window-width";


type HamburgerMenuParams = {
    className?: string;
}

const HamburgerMenu = ({
    className,
}: HamburgerMenuParams) => {
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
    useWindowWidth(setIsOpen);

    return (
        <div className={cn("", className)}>
            <Button
                variant="ghost"
                className="relative"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Toggle menu"
            >
                <Menu className="!h-6 !w-6 !p-0" />
            </Button>
            <div
                className={`fixed inset-0 z-50 flex flex-col bg-white transition-transform duration-300 ease-in-out [&>*]:bg-white ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between p-6">
                    <span className="font-semibold text-xl">Menu</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <nav className="flex-1 px-6">
                    <ul className="space-y-4 mb-6">
                        {Object.entries(featuredCategories).map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item[1]}
                                    className="text-lg font-light hover:text-primary transition-colors flex"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item[0]}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="mb-4">
                        <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Categories</h3>
                    </div>

                    <ul className="space-y-4 mb-6">
                        {Object.entries(categoriesRef).map((item, index) => (
                            <li key={index}>
                                <a
                                    href={`/${item[0]}`}
                                    className="text-lg font-light hover:text-primary transition-colors flex"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item[1]}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-6">
                    <div className="flex justify-start gap-6">
                        <a
                            href="#"
                            className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Account
                        </a>
                        <a
                            href="#"
                            className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Help
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HamburgerMenu;



