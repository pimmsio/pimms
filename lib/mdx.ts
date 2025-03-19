import fs from "fs";
import path from "path";

export type Metadata = {
  title: string;
  publishedAt: string;
  updatedAt: string;
  description: string;
  image: string;
};

export const parseFrontmatter = (fileContent: string) => {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content };
};

export const getMDXFiles = (dir: string) => {
  try {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return [];
  }
};

export const readMDXFile = (filePath: string) => {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
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

export const getPage = (locale: string, dir: string, slug: string) => {
  const filePath = path.join(
    process.cwd(),
    "content",
    locale,
    dir,
    `${slug}.mdx`
  );
  const enPath = path.join(process.cwd(), "content", "en", dir, `${slug}.mdx`);

  // Fallback to English if file doesn't exist
  if (!fs.existsSync(filePath)) {
    console.log("Fallback to English", filePath);
    return readMDXFile(enPath);
  }

  return readMDXFile(filePath);
};

export const getPages = (locale: string, dir: string) => {
  // Use relative path from project root
  const legalPath = path.join(process.cwd(), "content", locale, dir);
  const enPath = path.join(process.cwd(), "content", "en", dir);

  // Fallback to English if locale directory doesn't exist
  if (!fs.existsSync(legalPath)) {
    console.log("Fallback to English", legalPath);
    return getMDXData(enPath);
  }

  return getMDXData(legalPath);
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
