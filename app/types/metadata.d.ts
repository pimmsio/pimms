type MetadataProps = {
  params: Promise<{ locale: "en" | "fr"; slug: string }>;
};

type TagMetadata = {
  tags?: string[];
};
