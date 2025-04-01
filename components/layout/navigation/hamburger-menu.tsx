"use client"

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollLock } from '@/lib/hooks/use-scroll-lock';
import { cn } from "@/lib/utils/classname-utils";

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

    return (
        <div className={cn("", className)}>
            <Button
                variant="ghost"
                className="relative !hover:bg-white"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Toggle menu"
            >
                <Menu className="!h-6 !w-6 !p-0" />
            </Button>
            <div
                className={`fixed inset-0 flex flex-col bg-background transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="relative flex-1 max-w-md mx-auto">

                    </div>
                    <Button variant="ghost" size="icon" className="ml-2" onClick={() => setIsOpen(false)} aria-label="Close menu">
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <nav className="flex-1 p-4 bg-white">
                    <ul className="space-y-4 text-xl">
                        <li>
                            <a
                                href="#"
                                className="block p-2 hover:bg-muted rounded-md transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block p-2 hover:bg-muted rounded-md transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block p-2 hover:bg-muted rounded-md transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block p-2 hover:bg-muted rounded-md transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Portfolio
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block p-2 hover:bg-muted rounded-md transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
};

export default HamburgerMenu;

