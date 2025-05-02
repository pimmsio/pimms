import fs from "fs/promises";
import path from "path";
import prettier from "prettier";
import { fileURLToPath } from "url";
import { BlogClient } from "seobot";

const seoBot = new BlogClient("07b92388-bb93-4df7-a7c6-10bdbc785ce1");

const getArticle = async (slug) => seoBot.getArticle(slug);
const getArticles = async (page) => seoBot.getArticles(page, 10);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, "..", "content/en/blog");

const formatDate = (dateStr) => dateStr?.split("T")?.[0] || "";

function capitalizeFirst(input) {
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

const run = async () => {
  const { articles } = await getArticles(0);

  for (const preview of articles) {
    const full = await getArticle(preview.slug);
    if (!full || !full.markdown || !full.published) continue;

    const frontmatter = `---
title: ${capitalizeFirst(full.headline.replace(/"/g, '\\"'))}
summary: ${capitalizeFirst(full.metaDescription.replace(/"/g, '\\"'))}
publishedAt: ${formatDate(full.publishedAt)}
updatedAt: ${formatDate(full.updatedAt)}
image: ${full.image}
author: emma
categories:
  - ${full.category?.slug || "uncategorized"}
related:
${full.relatedPosts.map((r) => `  - ${r.slug}`).join("\n")}
---

`;

    const fullPath = path.join(BLOG_DIR, `${full.slug}.mdx`);
    const markdownWithoutTitle = full.markdown.replace(/^# .*\n+/, "");
    const output = frontmatter + markdownWithoutTitle;

    await fs.mkdir(BLOG_DIR, { recursive: true });
    await fs.writeFile(
      fullPath,
      await prettier.format(output, { parser: "markdown" }),
      "utf8"
    );

    console.log(`✅ Saved ${full.slug}.mdx`);
  }
};

run();
