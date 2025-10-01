"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShipIcon } from "lucide-react";
import { useState } from "react";

import { navLinks, companyInfo } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-card/80 backdrop-blur-lg sticky top-0 z-50 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-10 w-auto" height={40} width={40} />
          <span className="hidden font-bold sm:inline-block font-headline">
            {companyInfo.name}
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === link.href ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
            <Button asChild className="hidden md:flex bg-accent hover:bg-accent/90">
                <Link href="/contact">Request a Quote</Link>
            </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <div className="flex flex-col h-full">
                    <div className="border-b pb-4">
                        <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                            <Logo className="h-10 w-auto" height={40} width={40} />
                            <span className="font-bold font-headline">{companyInfo.name}</span>
                        </Link>
                    </div>
                    <nav className="flex flex-col gap-4 py-4">
                        {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                            "text-muted-foreground transition-colors hover:text-foreground",
                            pathname === link.href && "text-foreground font-semibold"
                            )}
                        >
                            {link.label}
                        </Link>
                        ))}
                    </nav>
                    <div className="mt-auto">
                        <Button asChild className="w-full bg-accent hover:bg-accent/90">
                            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Request a Quote</Link>
                        </Button>
                    </div>
                </div>
            </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
