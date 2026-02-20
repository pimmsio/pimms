import { writeFileSync } from "fs";
import path from "path";
import { getPages } from "@/lib/mdx";
import { articleFolders, ArticleFolders, landingFolders, locales, translationFolders } from "@/i18n/config";
import { basePathnames } from "@/i18n/basePathnames";

async function generatePathnames() {
  const result: Record<string, Record<string, string>> = {};

  // Track latest update dates
  const latestByCategory: Record<string, Date> = {};
  const latestByAuthor: Record<string, Date> = {};
  let latestArticleDate = new Date(0);
  let latestOverallDate = new Date(0);

  // 1. Start by adding static basePathnames (lastmod is set in step 4)
  for (const sharedKey in basePathnames) {
    result[sharedKey] = {};

    for (const locale of locales) {
      const baseEntry = basePathnames[sharedKey as keyof typeof basePathnames];
      result[sharedKey][locale] = (baseEntry as Record<string, string>)?.[locale] || sharedKey;
    }
  }

  // 2. Add dynamic pages (blog, guides, tutorials)
  for (const locale of locales) {
    const pages = getPages(locale, articleFolders);

    for (const page of pages) {
      const baseFolder = (page.metadata.categories.find((cat: string) =>
        articleFolders.includes(cat as ArticleFolders)
      ) || "blog") as ArticleFolders;

      const localizedPath = `/${translationFolders[locale][baseFolder]}/${page.metadata.slug}`;
      const sharedKey = `/articles/${page.slug}`;

      if (!result[sharedKey]) {
        result[sharedKey] = {};
      }

      result[sharedKey][locale] = localizedPath;

      const updatedAt = page.metadata.updatedAt ? new Date(page.metadata.updatedAt) : null;
      if (updatedAt) {
        result[sharedKey]["lastmod"] = updatedAt.toISOString();
        if (updatedAt > latestArticleDate) latestArticleDate = updatedAt;
        if (updatedAt > latestOverallDate) latestOverallDate = updatedAt;

        for (const cat of page.metadata.categories) {
          if (!latestByCategory[cat] || updatedAt > latestByCategory[cat]) {
            latestByCategory[cat] = updatedAt;
          }
        }

        // Track latest per author
        const author = page.metadata.author;
        if (author) {
          if (!latestByAuthor[author] || updatedAt > latestByAuthor[author]) {
            latestByAuthor[author] = updatedAt;
          }
        }
      }
    }
  }

  // 3. Add dynamic landing pages
  for (const locale of locales) {
    const pages = getPages(locale, landingFolders);

    for (const page of pages) {
      const sharedKey = `/landings/${page.slug}`;
      const slug = page.metadata.slug;
      const folder = page.metadata.folder;

      if (!result[sharedKey]) {
        result[sharedKey] = {};
      }

      // Build localized path using folder + slug
      // If folder is undefined, default to "solutions"
      // If folder is empty string "", map to root level
      let localizedPath: string;
      if (folder === "") {
        // Special case: empty folder means root level (e.g., /home, /2october)
        localizedPath = slug === "home" ? "/" : `/${slug}`;
      } else {
        // Default folder is "solutions"
        const finalFolder = folder || "solutions";
        localizedPath = `/${finalFolder}/${slug}`;
      }

      result[sharedKey][locale] = localizedPath;
      const landingUpdatedAt = page.metadata.updatedAt ? new Date(page.metadata.updatedAt) : null;
      if (landingUpdatedAt) {
        result[sharedKey]["lastmod"] = landingUpdatedAt.toISOString();
        if (landingUpdatedAt > latestOverallDate) latestOverallDate = landingUpdatedAt;
      }
    }
  }

  // 4. Patch lastmod for special routes and fill missing lastmod
  for (const sharedKey in result) {
    if (sharedKey === "/articles") {
      result[sharedKey]["lastmod"] = latestArticleDate.toISOString();
      continue;
    }

    if (sharedKey.startsWith("/articles/category/")) {
      const cat = sharedKey.split("/").pop();
      if (cat && latestByCategory[cat]) {
        result[sharedKey]["lastmod"] = latestByCategory[cat].toISOString();
      } else if (latestArticleDate.getTime() > 0) {
        result[sharedKey]["lastmod"] = latestArticleDate.toISOString();
      }
      continue;
    }

    if (sharedKey.startsWith("/articles/author/")) {
      const author = sharedKey.split("/").pop();
      if (author && latestByAuthor[author]) {
        result[sharedKey]["lastmod"] = latestByAuthor[author].toISOString();
      } else if (latestArticleDate.getTime() > 0) {
        result[sharedKey]["lastmod"] = latestArticleDate.toISOString();
      }
      continue;
    }

    // Static routes without lastmod inherit the latest overall content date
    if (!result[sharedKey]["lastmod"] && latestOverallDate.getTime() > 0) {
      result[sharedKey]["lastmod"] = latestOverallDate.toISOString();
    }
  }

  // 5. Write file
  const fileContent = `export const pathnames: Record<string, Record<string, string>> = ${JSON.stringify(
    result,
    null,
    2
  )} as const;\n`;

  const targetPath = path.resolve(__dirname, "../i18n/pathnames.ts");
  writeFileSync(targetPath, fileContent);

  console.log("✅ Generated pathnames in:", targetPath);
}

generatePathnames().catch((err) => {
  console.error("❌ Failed to generate pathnames:", err);
  process.exit(1);
});
