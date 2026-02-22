"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScript } from "@/context/ScriptContext";

const SEGMENT_LABELS: Record<string, string> = {
  "velika-sala": "Велика сала",
  sale: "Сале",
  "crvena-sala": "Црвена сала",
  "plava-sala": "Плава сала",
  "mala-sala": "Мала сала",
  "dzudo-sala": "Џудо сала",
  kuglana: "Куглана",
  teretana: "Теретана",
  "bazen-borkovac": "Базен Борковац",
  galerija: "Галерија",
  "o-nama": "О нама",
  kontakt: "Контакт",
  dogadjaji: "Догађаји",
  detalj: "Детаљ",
  vesti: "Вести",
  obavestenja: "Обавештења",
  "api-health": "API статус",
};

function segmentToLabel(segment: string) {
  return SEGMENT_LABELS[segment] ?? segment.replace(/-/g, " ");
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const { t } = useScript();

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = [
    { href: "/", label: t("Насловна") },
    ...segments.map((segment, index) => ({
      href: `/${segments.slice(0, index + 1).join("/")}`,
      label: t(segmentToLabel(segment)),
    })),
  ];

  return (
    <nav className="breadcrumbs" aria-label={t("Путања")}>
      <div className="container breadcrumbs-inner">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <span key={crumb.href} className="breadcrumbs-item">
              {isLast ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <Link href={crumb.href}>{crumb.label}</Link>
              )}
              {!isLast ? <span className="breadcrumbs-separator">/</span> : null}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
