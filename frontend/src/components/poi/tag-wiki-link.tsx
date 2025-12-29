// components/TagWikiLink.tsx
import { getTag } from "@/lib/getTag";
import Link from "next/link";

interface TagWikiLinkProps {
  tagKey: string;
  value?: string | null;
  label: string;
}

export default async function TagWikiLink({
  tagKey,
  value,
  label,
}: TagWikiLinkProps) {
  const tagInfo = await getTag(tagKey, value || null);
  const url = tagInfo?.wikiLink;

  if (!url) return <span>{label}</span>;

  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      {label}
    </Link>
  );
}
