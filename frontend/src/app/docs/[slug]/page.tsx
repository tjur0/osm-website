import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import { mdxComponents } from "@/components/mdx/mdx";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMdxFile } from "@/lib/getMdxFiles";

interface DocPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "content", "docs"));

  const params = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    return {
      slug: encodeURIComponent(slug),
    };
  });

  return params;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const raw = await params;

  if (!raw) return notFound();

  const slug = decodeURIComponent(raw.slug);

  const { frontmatter } = await getMdxFile(slug, "docs");

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const raw = await params;

  if (!raw) return notFound();

  const { slug } = {
    slug: decodeURIComponent(raw.slug),
  };

  const { content } = await getMdxFile(slug, "docs");

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/docs`} aria-label="Terug naar de documentatie">
        <ArrowLeft />
      </Link>

      <article className="prose flex flex-col gap-2">
        <MDXRemote source={content} components={mdxComponents} />
      </article>
    </div>
  );
}
