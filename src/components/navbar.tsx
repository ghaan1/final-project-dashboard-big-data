"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Truck,
  LayoutDashboard,
  Database,
  Brain,
  Network,
  TrendingUp,
  Info,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/data-quality", label: "Data Quality", icon: Database },
  { href: "/ml", label: "Machine Learning", icon: Brain },
  { href: "/graph", label: "Graph Analytics", icon: Network },
  { href: "/insights", label: "Insights", icon: TrendingUp },
  { href: "/about", label: "About", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-navy text-white">
              <Truck className="h-5 w-5" />
            </div>
            <div className="hidden sm:block">
              <div className="font-heading text-base font-bold text-brand-navy">
                Logistics Big Data
              </div>
              <div className="text-xs text-muted-foreground">
                Final Project Dashboard
              </div>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-brand-navy text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
