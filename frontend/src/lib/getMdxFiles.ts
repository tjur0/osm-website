import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getAllMdxFiles() {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"));

  return files.map((filename) => {
    const fullPath = path.join(CONTENT_DIR, filename);
    const fileContent = fs.readFileSync(fullPath, "utf-8");

    const { data: frontmatter, content } = matter(fileContent);

    return {
      slug: filename.replace(/\.mdx$/, ""),
      frontmatter,
      content,
    };
  });
}
