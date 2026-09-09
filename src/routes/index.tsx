import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Phone, MessageCircle, Search, Plus, Minus, X, ShoppingBag } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { menu, business, type MenuItem } from "@/data/menu";

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
    ],
  }),
  component: Index,
});

type CartLine = { key: string; name: string; price: string; value: number; qty: number };

function Index() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(menu[0].id);
  const [cart, setCart] = useState<Record<string, CartLine>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [notes, setNotes] = useState("");

  const categories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return menu;
    return menu
      .map((c) => ({ ...c, items: c.items.filter((i) => i.name.toLowerCase().includes(q)) }))
      .filter((c) => c.items.length > 0);
  }, [query]);

  const lines = Object.values(cart);
  const itemCount = lines.reduce((n, l) => n + l.qty, 0);
  const total = lines.reduce((n, l) => n + l.qty * l.value, 0);
  const hasVariablePrice = lines.some((l) => l.price.includes("/"));

  function add(item: MenuItem, categoryId: string) {
    const key = `${categoryId}::${item.name}`;
    setCart((c) => ({
      ...c,
      [key]: {
        key,
        name: item.name,
        price: item.price,
        value: item.value,
        qty: (c[key]?.qty ?? 0) + 1,
      },
    }));
  }

  function remove(key: string) {
    setCart((c) => {
      const line = c[key];
      if (!line) return c;
      const next = { ...c };
      if (line.qty <= 1) delete next[key];
      else next[key] = { ...line, qty: line.qty - 1 };
      return next;
    });
  }

  const orderText = useMemo(() => {
    const header = `Hello ${business.name}, I would like to place an order:`;
    const body = lines.map((l) => `• ${l.qty} x ${l.name} (AED ${l.price})`).join("\n");
    const parts = [header, body, `Estimated total: AED ${total.toFixed(2)}`];
    if (customerName.trim()) parts.push(`Name: ${customerName.trim()}`);
    if (notes.trim()) parts.push(`Notes / delivery address: ${notes.trim()}`);
    return parts.join("\n");
  }, [lines, total, customerName, notes]);

  const whatsappHref = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(orderText)}`;

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
            href={`https://wa.me/${business.whatsappNumber}`}
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
              {c.items.map((item) => {
                const key = `${c.id}::${item.name}`;
                const qty = cart[key]?.qty ?? 0;
                return (
                  <li key={key} className="flex items-center gap-3 px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-card-foreground">
                        {item.name}
                      </p>
                      {item.note && (
                        <p className="text-xs text-muted-foreground">{item.note}</p>
                      )}
                    </div>
                    <span className="text-sm font-bold text-gold">{item.price}</span>
                    {qty > 0 ? (
                      <div className="flex items-center gap-2 rounded-full border border-border px-1 py-1">
                        <button
                          onClick={() => remove(key)}
                          aria-label={`Remove one ${item.name}`}
                          className="grid size-7 place-items-center rounded-full bg-secondary text-secondary-foreground"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-4 text-center text-sm font-bold">{qty}</span>
                        <button
                          onClick={() => add(item, c.id)}
                          aria-label={`Add one ${item.name}`}
                          className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => add(item, c.id)}
                        aria-label={`Add ${item.name} to order`}
                        className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        <Plus className="size-4" />
                      </button>
                    )}
                  </li>
                );
              })}
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
            href={`https://wa.me/${business.whatsappNumber}`}
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

      {/* Cart bar */}
      {itemCount > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed inset-x-4 bottom-4 z-30 flex items-center justify-between rounded-2xl bg-primary px-5 py-4 font-semibold text-primary-foreground shadow-lg"
        >
          <span className="flex items-center gap-2">
            <ShoppingBag className="size-5" aria-hidden="true" />
            {itemCount} item{itemCount > 1 ? "s" : ""}
          </span>
          <span>AED {total.toFixed(2)} · Review order</span>
        </button>
      )}

      {/* Cart sheet */}
      {cartOpen && (
        <div className="fixed inset-0 z-40 flex items-end bg-black/60" role="dialog" aria-label="Your order">
          <button
            className="absolute inset-0 cursor-default"
            aria-label="Close order summary"
            onClick={() => setCartOpen(false)}
          />
          <div className="relative max-h-[88vh] w-full overflow-y-auto rounded-t-3xl border-t border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-gold">Your order</h2>
              <button onClick={() => setCartOpen(false)} aria-label="Close">
                <X className="size-5 text-muted-foreground" />
              </button>
            </div>

            {lines.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Your order is empty.
              </p>
            ) : (
              <>
                <ul className="mt-4 divide-y divide-border">
                  {lines.map((l) => (
                    <li key={l.key} className="flex items-center gap-3 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{l.name}</p>
                        <p className="text-xs text-muted-foreground">AED {l.price} each</p>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-border p-1">
                        <button
                          onClick={() => remove(l.key)}
                          aria-label={`Remove one ${l.name}`}
                          className="grid size-7 place-items-center rounded-full bg-secondary text-secondary-foreground"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-4 text-center text-sm font-bold">{l.qty}</span>
                        <button
                          onClick={() =>
                            add({ name: l.name, price: l.price, value: l.value }, l.key.split("::")[0])
                          }
                          aria-label={`Add one ${l.name}`}
                          className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-base font-bold">
                  <span>Estimated total</span>
                  <span className="text-gold">AED {total.toFixed(2)}</span>
                </div>
                {hasVariablePrice && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Some items have small/large prices — the total uses the lower price. The
                    cafeteria will confirm the final amount.
                  </p>
                )}

                <div className="mt-4 space-y-3">
                  <input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your name (optional)"
                    className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none focus:border-primary"
                    aria-label="Your name"
                  />
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Delivery address or notes (optional)"
                    rows={3}
                    className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none focus:border-primary"
                    aria-label="Delivery address or notes"
                  />
                </div>

                <div className="mt-4 space-y-3">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-4 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <MessageCircle className="size-5" aria-hidden="true" /> Order via WhatsApp
                  </a>
                  <a
                    href={business.landlineHref}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-secondary px-4 py-4 font-semibold text-secondary-foreground transition-colors hover:bg-muted"
                  >
                    <Phone className="size-5" aria-hidden="true" /> Call {business.landline}
                  </a>
                  <button
                    onClick={() => setCart({})}
                    className="w-full py-2 text-center text-xs text-muted-foreground underline-offset-4 hover:underline"
                  >
                    Clear order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
