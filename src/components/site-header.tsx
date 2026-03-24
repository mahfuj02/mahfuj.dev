const navItems = [
  { label: "Home", href: "#home" },
  { label: "Expertise", href: "#expertise" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-900/70 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <a href="#home" className="text-sm font-semibold tracking-[0.12em]">
          TAMAL SEN
        </a>
        <ul className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-zinc-400 transition-colors hover:text-zinc-100"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}