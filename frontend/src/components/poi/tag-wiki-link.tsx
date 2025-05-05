// components/TagWikiLink.tsx
import Link from "next/link";

interface TagWikiLinkProps {
  tagKey: string;
  value?: string;
  label: string;
}

// list of keys that probably dont have a full tag wiki page
const excludedKeys = [
  "addr*",
  "name*",
  "contact*",
  "opening_hours*",
  "website",
  "email",
  "phone",
  "url",
  "operator",
  "check_date*",
  "ref*",
];

function tagShouldNotBeChecked(tagKey: string): boolean {
  for (const key of excludedKeys) {
    if (key.endsWith("*")) {
      const prefix = key.slice(0, -1);
      if (tagKey.startsWith(prefix)) return true;
    } else if (tagKey === key) {
      return true;
    }
  }

  return false;
}

export default async function TagWikiLink({
  tagKey,
  value,
  label,
}: TagWikiLinkProps) {
  if (value && tagShouldNotBeChecked(tagKey)) {
    return <span>{label}</span>;
  }

  let url = `https://wiki.openstreetmap.org/wiki/`;
  if (value) {
    url += `Tag:${encodeURIComponent(tagKey)}%3D${encodeURIComponent(value)}`;
  } else {
    url += `Key:${encodeURIComponent(tagKey)}`;
  }

  let exists = false;

  try {
    const res = await fetch(url, {
      method: "HEAD",
      next: { revalidate: false }, // Disable caching for this request
    });
    exists = res.ok;
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  } catch (e) {
    exists = false;
  }

  if (!exists) {
    return <span>{label}</span>;
  }

  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      {label}
    </Link>
  );
}
