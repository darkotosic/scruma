import Link from "next/link";

type DetailFooterNavProps = {
  backHref: string;
  backLabel: string;
  nextHref?: string;
  nextLabel?: string;
};

export default function DetailFooterNav({
  backHref,
  backLabel,
  nextHref,
  nextLabel,
}: DetailFooterNavProps) {
  return (
    <div className="detail-footer-nav">
      <Link href={backHref} className="btn">
        ← {backLabel}
      </Link>
      {nextHref && nextLabel ? (
        <Link href={nextHref} className="btn btnPrimary">
          Следеће из категорије: {nextLabel} →
        </Link>
      ) : null}
    </div>
  );
}
