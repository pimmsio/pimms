import Header from "@/components/tools/header";

const tkey = "tools";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background-secondary text-foreground w-11/12 mx-auto">
      <Header tkey={tkey} />
      {children}
    </div>
  );
}
