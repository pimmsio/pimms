import fs from "fs";
import path from "path";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { remarkFaqDirective } from "./mdx/remarkFaqDirective";

export type PageMetadata = {
  title: string;
  publishedAt: string;
  updatedAt: string;
  summary: string;
  slug: string;
  image: string;
  categories: string[];
  author?: string;
  related?: string[];
};

type LoosePageMetadata = {
  [K in keyof PageMetadata]: string | string[];
};

export const parseFrontmatter = (fileContent: string) => {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match) {
    throw new Error("No frontmatter found");
  }
  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.split("\n");

  const metadata: Partial<LoosePageMetadata> = {};
  let currentKey: keyof LoosePageMetadata | null = null;

  frontMatterLines.forEach((line) => {
    // Gestion des éléments de liste
    if (/^\s*-\s+/.test(line) && currentKey) {
      const item = line.replace(/^\s*-\s+/, "").trim();
      if (!Array.isArray(metadata[currentKey])) {
        if (metadata[currentKey] !== undefined) {
          // S'il y avait déjà une valeur (en string), on la transforme en tableau.
          metadata[currentKey] = [metadata[currentKey] as string];
        } else {
          metadata[currentKey] = [];
        }
      }
      (metadata[currentKey] as string[]).push(item);
    } else {
      // Traitement des lignes "clé: valeur"
      const keyValMatch = line.match(/^([^:]+):\s*(.*)$/);
      if (keyValMatch) {
        currentKey = keyValMatch[1].trim() as keyof LoosePageMetadata;
        let value = keyValMatch[2].trim();
        // S'il n'y a pas de valeur, on présume une liste
        if (value === "") {
          metadata[currentKey] = [];
        } else {
          value = value.replace(/^['"](.*)['"]$/, "$1"); // Retire les guillemets si présents
          metadata[currentKey] = value;
        }
      }
    }
  });

  // Normalisation pour coller au type PageMetadata
  const normalized: PageMetadata = {
    title: metadata.title as string,
    publishedAt: metadata.publishedAt as string,
    updatedAt: metadata.updatedAt as string,
    slug: metadata.slug as string,
    summary: metadata.summary as string,
    author: metadata.author as string,
    image: metadata.image as string,
    categories: Array.isArray(metadata.categories)
      ? metadata.categories
      : metadata.categories
        ? [metadata.categories as string]
        : [],
    related: Array.isArray(metadata.related)
      ? metadata.related
      : metadata.related
        ? [metadata.related as string]
        : [],
  };

  return { metadata: normalized, content };
};

export const getMDXFiles = (dir: string) => {
  try {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return [];
  }
};

export type Faq = {
  question: string;
  answer: string;
};

export function extractFaqsFromMdxSync(content: string): Faq[] {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDirective)
    .use(remarkFaqDirective);

  const file = { value: content, data: {} };
  const tree = processor.parse(content);
  processor.runSync(tree, file);

  return (file.data as any).faqs || [];
}

export const readMDXFile = (filePath: string) => {
  let rawContent = fs.readFileSync(filePath, "utf-8");

  // Normalize ::: directives (e.g., ::: faq → :::@faq)
  rawContent = rawContent.replace(/^:::\s?/gm, ":::");
  // Transform :::@iframe <url> into :::iframe\n<url>\n:::
  rawContent = rawContent.replace(
    /^:::@iframe\s+(.+)$/gm,
    (_match, url) => `:::iframe\n${url.trim()}\n`
  );
  // replace preview.pimms.io with app.pimms.io
  rawContent = rawContent.replace(/preview\.pimms\.io/g, "app.pimms.io");

  const slug = path.basename(filePath, path.extname(filePath));
  return { ...parseFrontmatter(rawContent), slug };
};

export const getMDXData = (dir: string) => {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
};

export const getPage = (
  locale: string,
  dirs: string | string[],
  slug: string
) => {
  const root = process.cwd();
  const dirList = Array.isArray(dirs) ? dirs : [dirs];

  // Build a prioritized list of paths to try (localized first, then fallback to "en")
  const possiblePaths = dirList.flatMap((dir) => [
    path.join(root, "content", locale, dir, `${slug}.mdx`),
    path.join(root, "content", "en", dir, `${slug}.mdx`),
  ]);

  const pathToUse = possiblePaths.find(fs.existsSync);

  if (!pathToUse) {
    throw new Error(
      `Page not found for slug "${slug}" in dirs [${dirList.join(", ")}]`
    );
  }

  const { metadata, content } = readMDXFile(pathToUse);
  const faqs = extractFaqsFromMdxSync(content);
  // extract dir from pathToUse
  const dir = pathToUse.split("/").slice(-2, -1)[0];

  return {
    metadata,
    slug,
    content,
    faqs,
    dir,
  };
};

export const getPages = (locale: string, dirs: string[]) => {
  const root = process.cwd();
  const results: any[] = [];

  for (const dir of dirs) {
    const localizedPath = path.join(root, "content", locale, dir);
    const fallbackPath = path.join(root, "content", "en", dir);

    const actualPath = fs.existsSync(localizedPath)
      ? localizedPath
      : fallbackPath;

    if (!fs.existsSync(actualPath)) {
      console.warn("Directory does not exist in any locale:", dir);
      continue;
    }

    const data = getMDXData(actualPath);
    results.push(...data);
  }

  return results;
};

export const formatDate = (date: string, includeRelative = false) => {
  if (!date) {
    return "";
  }

  const currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
};
