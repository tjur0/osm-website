import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import { mdxComponents } from "@/components/mdx/mdx";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface DocPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "content"));

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

  const { frontmatter } = await getDoc(slug);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
  };
}

async function getDoc(slug: string) {
  const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf-8");

  const { content, data } = matter(fileContents);

  return {
    frontmatter: data as {
      title: string;
      description: string;
      keywords: string[];
    },
    content,
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const raw = await params;

  if (!raw) return notFound();

  const { slug } = {
    slug: decodeURIComponent(raw.slug),
  };

  const { content } = await getDoc(slug);

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/docs`} aria-label="Terug naar de documentatie">
        <ArrowLeft />
      </Link>

      <article className="prose flex flex-col gap-4">
        <MDXRemote source={content} components={mdxComponents} />
      </article>
    </div>
  );
}
