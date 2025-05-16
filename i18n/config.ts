export const locales = ["en", "fr"] as const;

export const articleFolders: string[] = [
  "blog",
  "guides",
  "tutorials",
  "legal",
] as const;

export type ArticleFolders = (typeof articleFolders)[number];

export const translationFolders: Record<
  string,
  Record<ArticleFolders, string>
> = {
  en: {
    blog: "blog",
    guides: "guides",
    tutorials: "tutorials",
    legal: "legal",
  },
  fr: {
    blog: "blog",
    guides: "guides",
    tutorials: "tutoriels",
    legal: "legal",
  },
};
