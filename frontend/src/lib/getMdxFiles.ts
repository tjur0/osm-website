import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getAllMdxFiles(subFolder = "") {
  const folder = path.join(process.cwd(), "content", subFolder);

  const files = fs.readdirSync(folder).filter((file) => file.endsWith(".mdx"));

  return files.map((filename) => {
    const fullPath = path.join(folder, filename);
    const fileContent = fs.readFileSync(fullPath, "utf-8");

    const { data: frontmatter, content } = matter(fileContent);

    return {
      slug: filename.replace(/\.mdx$/, ""),
      frontmatter,
      content,
    };
  });
}

export async function getMdxFile(slug: string, subFolder = "") {
  const filePath = path.join(
    process.cwd(),
    "content",
    subFolder,
    `${slug}.mdx`
  );
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
