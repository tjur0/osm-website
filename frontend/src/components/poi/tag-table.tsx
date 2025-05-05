import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TagWikiLink from "./tag-wiki-link";

interface TagTableProps {
  poi: {
    tags: Record<string, string>;
  };
}

export default async function TagTable({ poi }: TagTableProps) {
  if (!poi.tags || Object.keys(poi.tags).length === 0) return null;

  const sortedTags = Object.entries(poi.tags).sort(([keyA], [keyB]) =>
    keyA.localeCompare(keyB)
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Key</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedTags.map(([key, value]) => (
          <TableRow key={`${key}:${value}`}>
            <TableCell>
              <TagWikiLink tagKey={key} label={key} />
            </TableCell>
            <TableCell>
              <TagWikiLink tagKey={key} value={value} label={value} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
