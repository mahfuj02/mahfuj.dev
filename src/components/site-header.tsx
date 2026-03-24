const navItems = [
  { label: "home", href: "#home" },
  { label: "expertise", href: "#expertise" },
  { label: "work", href: "#work" },
  { label: "experience", href: "#experience" },
  { label: "contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800/70 bg-zinc-950/65 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <a href="#home" className="text-xs font-semibold tracking-[0.22em] text-zinc-100">
          TAMAL SEN
        </a>
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
    </header>
  );
}