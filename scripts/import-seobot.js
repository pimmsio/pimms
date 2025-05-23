import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import prettier from "prettier";
import { fileURLToPath } from "url";
import { BlogClient } from "seobot";

const execAsync = promisify(exec);

const seoBot = new BlogClient("07b92388-bb93-4df7-a7c6-10bdbc785ce1");

const getArticle = async (slug) => seoBot.getArticle(slug);
const getArticles = async (page) => seoBot.getArticles(page, 50);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, "..", "content/en/blog");

const formatDate = (dateStr) => dateStr?.split("T")?.[0] || "";
const today = () => formatDate(new Date().toISOString());

function capitalizeFirst(input) {
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

const linkRewrites = [
  {
    from: "https://pimms.io/blog/utm-builder-guide",
    to: "/articles/utm-guide"
  },
  {
    from: "https://pimms.io/blog/introducing-conversion-tracking",
    to: "/articles/introducing-conversion"
  },
  {
    from: "https://pimms.io/blog/start-with-zapier",
    to: "/articles/start-with-zapier"
  },
  {
    from: "https://pimms.io/legal/privacy-policy",
    to: "/articles/privacy"
  },
  {
    from: "https://pimms.io/blog/setup-stripe-payments-tracking-with-pimms-on-any-website",
    to: "/articles/setup-stripe-for-website"
  },
  {
    from: "https://pimms.io/fr/blog/guide-balise-et-template-utm",
    to: "/articles/utm-guide"
  }
];

const rewriteStaticLinks = (markdown) => {
  for (const { from, to } of linkRewrites) {
    markdown = markdown.replaceAll(from, to);
  }
  return markdown;
};

const buildFrontmatter = (full, updatedAtOverride) => {
  const related = (full.relatedPosts || []).map((r) => `  - ${r.slug}`).join("\n");
  return `---
title: ${capitalizeFirst(full.headline.replace(/"/g, '\\"'))}
summary: ${capitalizeFirst(full.metaDescription.replace(/"/g, '\\"'))}
publishedAt: ${formatDate(full.publishedAt)}
updatedAt: ${updatedAtOverride || formatDate(full.updatedAt)}
slug: ${full.slug}
image: ${full.image}
author: emma
categories:
  - ${full.category?.slug || "uncategorized"}
related:
${related}
---

`;
};

const writeFormatted = async (filePath, content) => {
  const formatted = await prettier.format(content, { parser: "markdown" });
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, formatted, "utf8");
};

const fileChangedInGit = async (filePath) => {
  try {
    await execAsync(`git diff --quiet "${filePath}"`);
    return false; // no change
  } catch {
    return true; // file changed
  }
};

const run = async () => {
  const { articles } = await getArticles(0);
  console.log(`🔍 Found ${articles.length} articles.`);

  for (const preview of articles) {
    const full = await getArticle(preview.slug);
    if (!full || !full.markdown || !full.published) continue;

    const fullPath = path.join(BLOG_DIR, `${full.slug}.mdx`);
    let markdown = full.markdown.replace(/^# .*\n+/, "");
    markdown = rewriteStaticLinks(markdown); // 🔁 rewrite links

    const initialFrontmatter = buildFrontmatter(full);
    await writeFormatted(fullPath, initialFrontmatter + markdown);

    const changed = await fileChangedInGit(fullPath);

    if (changed) {
      const updatedFrontmatter = buildFrontmatter(full, today());
      await writeFormatted(fullPath, updatedFrontmatter + markdown);
      console.log(`📝 Updated ${full.slug} (changed, updatedAt is today)`);
    } else {
      console.log(`✅ Skipped ${full.slug} (no change)`);
    }
  }
};

run().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
