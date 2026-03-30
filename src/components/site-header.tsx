"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "home", href: "#home" },
  { label: "expertise", href: "#expertise" },
  { label: "work", href: "#work" },
  { label: "experience", href: "#experience" },
  { label: "contact", href: "#contact" },
];

export function SiteHeader() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 280);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-zinc-800/70 bg-zinc-950/65 backdrop-blur-xl transition-all duration-300 translate-y-0 opacity-100 ${
        visible ? "md:translate-y-0 md:opacity-100" : "md:-translate-y-full md:opacity-0 md:pointer-events-none"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <a href="#home" className="text-xs font-semibold tracking-[0.22em] text-zinc-100">
          MAHFUJ AHMED
        </a>
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 text-zinc-200 transition-colors hover:border-zinc-500 md:hidden"
        >
          <span className="relative h-4 w-5">
            <span className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition-transform ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
        <ul className="hidden items-center gap-5 text-xs tracking-[0.14em] text-zinc-400 md:flex">
          {navItems.map((item, index) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="transition-colors hover:text-zinc-100"
              >
                {String(index).padStart(2, "0")} · {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`overflow-hidden border-t border-zinc-800/70 bg-zinc-950/95 transition-[max-height,opacity] duration-300 md:hidden ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="mx-auto flex w-full max-w-6xl flex-col px-6 py-3 text-sm tracking-[0.12em] text-zinc-300">
          {navItems.map((item, index) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center border-b border-zinc-800/60 py-3 transition-colors hover:text-zinc-100"
              >
                {String(index).padStart(2, "0")} · {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}