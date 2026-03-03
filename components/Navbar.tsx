import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";

const nav = [
  {
    label: "Solutions",
    href: "#",
    children: [
      { label: "Trade Finance", href: "/solutions/trade-finance" },
    ],
  },
  { label: "Product", href: "#product" },
  { label: "Calculator", href: "#calculator" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#1a1340]/80 to-transparent backdrop-blur-md" />
        <Container className="relative flex h-20 items-center justify-between">
          <Link href="/" className="group inline-flex items-center gap-2">
            <Logo />
            <span className="sr-only">Tempest Home</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((item) =>
              "children" in item && item.children?.length ? (
                <div
                  key={item.label}
                  className="relative group"
                >
                  <span className="cursor-default text-sm text-white hover:text-white/80 transition">
                    {item.label}
                  </span>
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="rounded-lg border border-white/10 bg-[#0a0a1a]/95 backdrop-blur-md py-2 min-w-[180px] shadow-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-white transition"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white hover:text-white/80 transition"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#get-started"
              className="relative inline-flex items-center justify-center p-[1px] rounded-md overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#489EFF] to-[#0050FF]" />
              <div className="relative bg-[#0078FF]/80 px-3 py-1.5 rounded-[5px] text-sm font-semibold text-white hover:bg-[#0078FF]/90 transition">
                Get Started
              </div>
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}
