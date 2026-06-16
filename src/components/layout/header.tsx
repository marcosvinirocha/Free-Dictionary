"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Star, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Pesquisar", icon: Search },
  { href: "/dicionario", label: "Dicionário", icon: BookOpen },
  { href: "/favoritos", label: "Favoritos", icon: Star },
];

export function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function isActive(href: string) {
    if (!mounted) return false;
    return href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-4xl items-center gap-6 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <BookOpen className="h-5 w-5" />
          <span className="hidden sm:inline">Free Dictionary</span>
        </Link>

        <nav className="flex items-center gap-1 ml-auto">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                isActive(href)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
