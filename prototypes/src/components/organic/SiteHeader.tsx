"use client";

import { AssetImage } from "@/components/shared/AssetImage";
import Link from "next/link";
import {
  ChevronDown,
  Handshake,
  LogIn,
  Menu,
  MessageCircle,
  Phone,
  Search,
  Shield,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";

import {
  ORGANIC_NAV_MENUS,
  ORGANIC_UTILITY_LINKS,
  type NavMenuItem,
  type UtilityIconKey,
  type UtilityLinkItem,
} from "@/lib/organic-nav-data";
import { cn } from "@/lib/utils";

const UTILITY_ICON_MAP: Record<UtilityIconKey, typeof Shield> = {
  shield: Shield,
  handshake: Handshake,
  user: LogIn,
  "log-in": LogIn,
  "message-circle": MessageCircle,
};

const PHONE_DISPLAY = "+1 866 711 1700";
const PHONE_HREF = "tel:+18667111700";

export interface SiteHeaderProps {
  hideRequestInfo?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Utility dropdown — hover-reveal for desktop                        */
/* ------------------------------------------------------------------ */

function UtilityDropdown({ link }: { link: UtilityLinkItem }) {
  const Icon = UTILITY_ICON_MAP[link.icon];
  const hasChildren = link.children && link.children.length > 0;

  if (!hasChildren) {
    return (
      <Link
        href={link.href}
        className="group inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/85 transition-colors hover:bg-white/10 hover:text-white"
      >
        <Icon
          className="size-3 text-white/50 transition-colors group-hover:text-uagc-sky"
          strokeWidth={1.8}
          aria-hidden
        />
        {link.label}
      </Link>
    );
  }

  return (
    <div className="group/util relative">
      <Link
        href={link.href}
        className="inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/85 transition-colors hover:bg-white/10 hover:text-white group-hover/util:bg-white/10 group-hover/util:text-white"
      >
        <Icon
          className="size-3 text-white/50 transition-colors group-hover/util:text-uagc-sky"
          strokeWidth={1.8}
          aria-hidden
        />
        {link.label}
        <ChevronDown
          className="size-2.5 text-white/40 transition-transform group-hover/util:rotate-180 group-hover/util:text-white/70"
          strokeWidth={2}
          aria-hidden
        />
      </Link>
      <div className="invisible absolute left-0 top-full z-50 pt-1 opacity-0 transition-[visibility,opacity] group-hover/util:visible group-hover/util:opacity-100">
        <div className="min-w-[200px] rounded-lg border border-white/10 bg-uagc-navy-panel py-1 shadow-xl">
          <Link
            href={link.href}
            className="block px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-uagc-red/80 transition-colors hover:bg-white/10 hover:text-uagc-sky"
          >
            All {link.label}
          </Link>
          <div className="mx-3 my-1 h-px bg-white/10" />
          {link.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-1.5 text-[12px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mega-menu panel — simplified columns                               */
/* ------------------------------------------------------------------ */

function MegaMenuPanel({
  menu,
  panelId,
  onNavigate,
}: {
  menu: NavMenuItem;
  panelId: string;
  onNavigate: () => void;
}) {
  const colCount = menu.columns.length + (menu.featured ? 1 : 0);
  const gridCols =
    colCount <= 2
      ? "lg:grid-cols-2"
      : colCount <= 3
        ? "lg:grid-cols-3"
        : "lg:grid-cols-[1fr_1fr_1fr_260px]";

  return (
    <div
      id={panelId}
      role="region"
      aria-label={`${menu.label} menu`}
      className="absolute inset-x-0 top-full border-t border-uagc-border bg-white shadow-lg"
    >
      <div
        className={cn(
          "mx-auto grid w-full max-w-[1440px] gap-8 px-6 py-8 lg:px-10",
          gridCols,
        )}
      >
        {menu.columns.map((column) => (
          <div key={column.title}>
            {column.href ? (
              <Link
                href={column.href}
                onClick={onNavigate}
                className="mb-3 block text-[11px] font-bold uppercase tracking-widest text-uagc-navy/50 transition-colors hover:text-uagc-red"
              >
                {column.title}
              </Link>
            ) : (
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-uagc-navy/50">
                {column.title}
              </p>
            )}
            <ul className="space-y-1">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className="block rounded-md px-2 py-1.5 text-sm font-medium text-uagc-navy transition-colors hover:bg-muted hover:text-uagc-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {menu.featured ? (
          <div className="rounded-xl border border-uagc-border bg-uagc-cream p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-uagc-red">
              Recommended
            </p>
            <Link
              href={menu.featured.href}
              onClick={onNavigate}
              className="mt-2 block text-base font-semibold text-uagc-navy hover:text-uagc-red"
            >
              {menu.featured.label}
            </Link>
            {menu.featured.description ? (
              <p className="mt-1.5 text-sm leading-relaxed text-uagc-gray">
                {menu.featured.description}
              </p>
            ) : null}
            <Link
              href={menu.href}
              onClick={onNavigate}
              className="mt-4 inline-flex min-h-9 items-center rounded-full bg-uagc-navy px-4 text-xs font-bold uppercase tracking-wide text-white hover:bg-uagc-navy-hover"
            >
              View All {menu.label}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile nav accordion section                                       */
/* ------------------------------------------------------------------ */

function MobileNavSection({
  menu,
  onNavigate,
}: {
  menu: NavMenuItem;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const sectionId = `mobile-nav-${menu.id}`;

  return (
    <div className="border-b border-uagc-border">
      <button
        type="button"
        className="flex min-h-12 w-full items-center justify-between px-5 py-3 text-left text-base font-semibold text-uagc-navy"
        aria-expanded={open}
        aria-controls={sectionId}
        onClick={() => setOpen((value) => !value)}
      >
        {menu.label}
        <ChevronDown
          className={cn("size-5 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open ? (
        <div id={sectionId} className="space-y-5 px-5 pb-5">
          <Link
            href={menu.href}
            onClick={onNavigate}
            className="block text-sm font-semibold text-uagc-red"
          >
            All {menu.label}
          </Link>
          {menu.columns.map((column) => (
            <div key={column.title}>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-uagc-navy/40">
                {column.title}
              </p>
              <ul className="space-y-1">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="block rounded-md px-2 py-2 text-sm text-uagc-gray transition-colors hover:bg-muted hover:text-uagc-navy"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {menu.featured ? (
            <Link
              href={menu.featured.href}
              onClick={onNavigate}
              className="inline-flex min-h-9 items-center rounded-full bg-uagc-navy px-4 text-xs font-bold uppercase tracking-wide text-white"
            >
              {menu.featured.label}
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile utility accordion (for Military, Partnerships submenus)     */
/* ------------------------------------------------------------------ */

function MobileUtilitySection({
  link,
  onNavigate,
}: {
  link: UtilityLinkItem;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const Icon = UTILITY_ICON_MAP[link.icon];

  return (
    <div className="border-b border-uagc-border/50">
      <div className="flex items-center">
        <Link
          href={link.href}
          onClick={onNavigate}
          className="flex flex-1 items-center gap-3 px-5 py-3 transition-colors hover:bg-uagc-navy/5"
        >
          <Icon
            className="size-4 text-uagc-navy"
            strokeWidth={1.8}
            aria-hidden
          />
          <span className="text-sm font-semibold text-uagc-navy">
            {link.label}
          </span>
        </Link>
        <button
          type="button"
          className="touch-target flex items-center justify-center text-uagc-navy/50"
          onClick={() => setOpen((v) => !v)}
          aria-label={`${open ? "Collapse" : "Expand"} ${link.label} submenu`}
        >
          <ChevronDown
            className={cn("size-4 transition-transform", open && "rotate-180")}
            aria-hidden
          />
        </button>
      </div>
      {open && link.children ? (
        <div className="bg-white pb-2 pl-12 pr-5">
          {link.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className="block rounded-md px-2 py-1.5 text-sm text-uagc-gray transition-colors hover:bg-muted hover:text-uagc-navy"
            >
              {child.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SiteHeader                                                         */
/* ------------------------------------------------------------------ */

export function SiteHeader({ hideRequestInfo = false }: SiteHeaderProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileDrawerId = "site-header-mobile-drawer";

  const closeMenus = useCallback(() => {
    setOpenMenuId(null);
  }, []);

  const closeAll = useCallback(() => {
    closeMenus();
    setMobileOpen(false);
  }, [closeMenus]);

  useEffect(() => {
    if (!openMenuId && !mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeAll, mobileOpen, openMenuId]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!openMenuId) return;
      const target = event.target as Node;
      if (headerRef.current && !headerRef.current.contains(target)) {
        closeMenus();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [closeMenus, openMenuId]);

  const toggleMenu = (menuId: string) => {
    setOpenMenuId((current) => (current === menuId ? null : menuId));
  };

  const handleNavButtonClick = (
    event: ReactMouseEvent<HTMLButtonElement>,
    menu: NavMenuItem,
  ) => {
    event.preventDefault();
    toggleMenu(menu.id);
  };

  const openMenu = ORGANIC_NAV_MENUS.find((menu) => menu.id === openMenuId);

  const audienceLinks = ORGANIC_UTILITY_LINKS.filter(
    (l) => l.group === "audience",
  );
  const studentLinks = ORGANIC_UTILITY_LINKS.filter(
    (l) => l.group === "student",
  );
  const supportLinks = ORGANIC_UTILITY_LINKS.filter(
    (l) => l.group === "support",
  );

  return (
    <header
      ref={headerRef}
      role="banner"
      className="fixed inset-x-0 top-0 z-100 bg-white pt-[env(safe-area-inset-top,0px)] shadow-sm"
    >
      {/* ── Utility bar ── */}
      <div className="hidden bg-uagc-navy lg:block">
        <div className="mx-auto flex h-8 max-w-[1920px] items-center justify-between px-6 lg:px-10">
          {/* Left: audience links (with dropdown submenus) */}
          <nav aria-label="Audience" className="flex items-center gap-0.5">
            {audienceLinks.map((link, i) => (
              <span key={link.href} className="flex items-center">
                <UtilityDropdown link={link} />
                {i < audienceLinks.length - 1 && (
                  <span
                    className="mx-0.5 h-2.5 w-px bg-white/15"
                    aria-hidden
                  />
                )}
              </span>
            ))}
          </nav>

          {/* Right: student + support + phone + search */}
          <div className="flex items-center gap-0.5">
            {studentLinks.map((link) => (
              <UtilityDropdown key={link.href} link={link} />
            ))}

            <span className="mx-1 h-2.5 w-px bg-white/15" aria-hidden />

            {supportLinks.map((link) => (
              <UtilityDropdown key={link.href} link={link} />
            ))}

            <a
              href={PHONE_HREF}
              className="group inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[11px] font-semibold tracking-[0.04em] text-white/85 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Phone
                className="size-3 text-white/50 transition-colors group-hover:text-uagc-sky"
                strokeWidth={1.8}
                aria-hidden
              />
              {PHONE_DISPLAY}
            </a>

            <span className="mx-1 h-2.5 w-px bg-white/15" aria-hidden />

            <button
              type="button"
              className="group inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Search UAGC"
            >
              <Search
                className="size-3 text-white/50 transition-colors group-hover:text-uagc-sky"
                strokeWidth={1.8}
                aria-hidden
              />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ── Main nav bar ── */}
      <div className="relative mx-auto flex h-14 w-full max-w-[1920px] items-center justify-between gap-3 border-b border-uagc-border px-4 sm:h-16 sm:px-6 lg:px-10">
        {/* Logo */}
        <Link
          href="/organic/homepage"
          className="flex shrink-0 items-center py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy"
          aria-label="University of Arizona Global Campus home"
          onClick={closeAll}
        >
          <AssetImage
            src="/images/UAGC_logo.svg"
            alt="University of Arizona Global Campus"
            width={181}
            height={32}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        {/* Desktop primary nav */}
        <nav aria-label="Primary" className="hidden flex-1 justify-center xl:flex">
          <ul className="flex items-center gap-0.5">
            {ORGANIC_NAV_MENUS.map((menu) => {
              const isOpen = openMenuId === menu.id;
              const panelId = `site-nav-panel-${menu.id}`;
              return (
                <li key={menu.id}>
                  <button
                    type="button"
                    className={cn(
                      "inline-flex min-h-10 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy",
                      isOpen
                        ? "bg-muted text-uagc-red"
                        : "text-uagc-navy hover:bg-muted hover:text-uagc-red",
                    )}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={(event) => handleNavButtonClick(event, menu)}
                  >
                    {menu.label}
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right side CTAs */}
        <div className="flex items-center gap-2">
          <a
            href="https://cloud.mail.uagc.edu/apply"
            className="hidden min-h-9 items-center rounded-full bg-uagc-red px-5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-uagc-red-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-red sm:inline-flex"
            onClick={closeAll}
          >
            Apply Now
          </a>
          {!hideRequestInfo ? (
            <a
              href="#rfi"
              className="hidden min-h-9 items-center rounded-full bg-uagc-navy px-5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-uagc-navy-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy sm:inline-flex"
              onClick={closeAll}
            >
              Request Info
            </a>
          ) : null}

          <a
            href={PHONE_HREF}
            aria-label={`Call UAGC at ${PHONE_DISPLAY}`}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-uagc-navy transition-colors hover:bg-muted hover:text-uagc-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy xl:hidden"
          >
            <Phone className="size-5" strokeWidth={2} aria-hidden />
          </a>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-uagc-navy transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uagc-navy xl:hidden"
            aria-expanded={mobileOpen}
            aria-controls={mobileDrawerId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? (
              <X className="size-6" aria-hidden />
            ) : (
              <Menu className="size-6" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* ── Desktop mega-menu panel ── */}
      {openMenu ? (
        <MegaMenuPanel
          menu={openMenu}
          panelId={`site-nav-panel-${openMenu.id}`}
          onNavigate={closeAll}
        />
      ) : null}

      {/* ── Mobile drawer ── */}
      {mobileOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            className="fixed inset-0 top-14 z-98 bg-black/50 backdrop-blur-sm sm:top-16 xl:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div
            id={mobileDrawerId}
            className="fixed inset-x-0 bottom-0 top-14 z-99 overflow-y-auto bg-white pb-[env(safe-area-inset-bottom,0px)] sm:top-16 xl:hidden"
          >
            {/* Quick actions — SUNY-inspired top CTA strip */}
            <div className="flex gap-2 border-b border-uagc-border bg-uagc-navy px-4 py-3">
              {!hideRequestInfo ? (
                <a
                  href="#rfi"
                  onClick={closeAll}
                  className="flex flex-1 min-h-11 items-center justify-center rounded-full bg-uagc-navy text-xs font-bold uppercase tracking-wide text-white"
                >
                  Request Info
                </a>
              ) : null}
              <a
                href="https://cloud.mail.uagc.edu/apply"
                onClick={closeAll}
                className="flex flex-1 min-h-11 items-center justify-center rounded-full bg-uagc-red text-xs font-bold uppercase tracking-wide text-white"
              >
                Apply Now
              </a>
            </div>

            {/* Utility quick links with submenus */}
            <div className="border-b border-uagc-border bg-uagc-cream">
              {ORGANIC_UTILITY_LINKS.map((link) => {
                const Icon = UTILITY_ICON_MAP[link.icon];
                const hasChildren = link.children && link.children.length > 0;

                if (!hasChildren) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeAll}
                      className="flex items-center gap-3 border-b border-uagc-border/50 px-5 py-3 transition-colors hover:bg-uagc-navy/5"
                    >
                      <Icon
                        className="size-4 text-uagc-navy"
                        strokeWidth={1.8}
                        aria-hidden
                      />
                      <span className="text-sm font-semibold text-uagc-navy">
                        {link.label}
                      </span>
                    </Link>
                  );
                }

                return (
                  <MobileUtilitySection
                    key={link.href}
                    link={link}
                    onNavigate={closeAll}
                  />
                );
              })}
              <a
                href={PHONE_HREF}
                className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-uagc-navy/5"
              >
                <Phone
                  className="size-4 text-uagc-navy"
                  strokeWidth={1.8}
                  aria-hidden
                />
                <span className="text-sm font-semibold text-uagc-navy">
                  Call {PHONE_DISPLAY}
                </span>
              </a>
            </div>

            {/* Primary nav sections */}
            {ORGANIC_NAV_MENUS.map((menu) => (
              <MobileNavSection key={menu.id} menu={menu} onNavigate={closeAll} />
            ))}

            {/* Bottom support */}
            <div className="px-5 py-5">
              <a
                href={PHONE_HREF}
                className="flex min-h-10 items-center justify-center gap-2 text-sm font-semibold text-uagc-navy"
              >
                <Phone className="size-4" aria-hidden />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
