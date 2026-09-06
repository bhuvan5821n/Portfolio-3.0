import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

type NextWorldProps = {
  href: string;
  label: string;
  title: string;
  tone?: "paper" | "graphite";
};

export function NextWorld({ href, label, title, tone = "graphite" }: NextWorldProps) {
  return (
    <aside className={`next-world next-world--${tone}`} aria-label={`Next: ${title}`}>
      <div className="next-world__cable" aria-hidden="true" />
      <Link href={href}>
        <span>{label}</span>
        <strong>{title}</strong>
        <ArrowRightIcon size={30} weight="bold" aria-hidden="true" />
      </Link>
    </aside>
  );
}
