import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Phone, MessageCircle, Search, X } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { menu, business } from "@/data/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Al Warqa Cafeteria — Menu & Delivery, Muwaileh Sharjah" },
      {
        name: "description",
        content:
          "Browse the full Al Warqa Cafeteria menu — biryani, karahi, club sandwiches, smash burgers and more. Free delivery in Muwaileh, Sharjah. Order by phone or WhatsApp.",
      },
      { property: "og:title", content: "Al Warqa Cafeteria — Menu & Delivery" },
      {
        property: "og:description",
        content:
          "Full menu with prices in AED. Free delivery in Muwaileh, Sharjah. Order by phone or WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(menu[0]!.id);

  const categories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return menu;
    return menu
      .map((c) => ({ ...c, items: c.items.filter((i) => i.name.toLowerCase().includes(q)) }))
      .filter((c) => c.items.length > 0);
  }, [query]);

  return (
    <main className="min-h-screen bg-background pb-28">
      {/* Hero */}
      <header className="relative">
        <img
          src={heroImg}
          alt="Selection of dishes served at Al Warqa Cafeteria"
          width={1600}
          height={912}
          className="h-64 w-full object-cover sm:h-80"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
          <p className="text-sm font-semibold tracking-[0.3em] text-gold uppercase">
            {business.nameAr}
          </p>
          <h1 className="mt-1 text-4xl leading-none text-foreground sm:text-5xl">
            {business.name}
          </h1>
          <p className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:underline"
            >
              {business.address}
            </a>
          </p>
        </div>
      </header>

      <section className="px-5 pt-4">
        <div className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-semibold text-gold shadow-[var(--shadow-card)]">
          FREE DELIVERY · Open daily · All prices in AED
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <a
            href={business.landlineHref}
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-3 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-muted"
          >
            <Phone className="size-4" aria-hidden="true" /> Call {business.landline}
          </a>
          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </section>

      {/* Search */}
      <div className="sticky top-0 z-20 mt-5 border-y border-border bg-background/95 px-5 py-3 backdrop-blur">
        <label className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <Search className="size-4 text-muted-foreground" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the menu…"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="Search the menu"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search">
              <X className="size-4 text-muted-foreground" />
            </button>
          )}
        </label>

        {!query && (
          <nav className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1">
            {menu.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                onClick={() => setActive(c.id)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active === c.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                {c.title}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Menu */}
      <div className="px-5">
        {categories.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No dishes match “{query}”.
          </p>
        )}

        {categories.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-36 pt-8">
            <h2 className="text-2xl text-gold">{c.title}</h2>
            <p className="text-xs text-muted-foreground">{c.blurb}</p>
            <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
              {c.items.map((item) => (
                <li key={`${c.id}::${item.name}`} className="flex items-baseline gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-card-foreground">{item.name}</p>
                    {item.note && <p className="text-xs text-muted-foreground">{item.note}</p>}
                  </div>
                  <span className="shrink-0 text-sm font-bold text-gold">{item.price}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <footer className="mt-12 border-t border-border px-5 py-8 text-sm text-muted-foreground">
        <h2 className="text-xl text-gold">Contact</h2>
        <p className="mt-2">
          Landline:{" "}
          <a href={business.landlineHref} className="text-foreground underline-offset-4 hover:underline">
            {business.landline}
          </a>
        </p>
        <p>
          WhatsApp / Mobile:{" "}
          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline-offset-4 hover:underline"
          >
            {business.whatsapp}
          </a>
        </p>
        <p>
          Email:{" "}
          <a href={`mailto:${business.email}`} className="text-foreground underline-offset-4 hover:underline">
            {business.email}
          </a>
        </p>
        <p className="mt-2">{business.address}</p>
        <p className="mt-4 text-xs">Prices in AED and may change without notice.</p>
      </footer>

      {/* Sticky order actions */}
      <div className="fixed inset-x-4 bottom-4 z-30 grid grid-cols-2 gap-3">
        <a
          href={business.landlineHref}
          className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-secondary px-4 py-4 font-semibold text-secondary-foreground shadow-lg"
        >
          <Phone className="size-5" aria-hidden="true" /> Call to order
        </a>
        <a
          href={business.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-4 font-semibold text-primary-foreground shadow-lg"
        >
          <MessageCircle className="size-5" aria-hidden="true" /> WhatsApp
        </a>
      </div>
    </main>
  );
}
