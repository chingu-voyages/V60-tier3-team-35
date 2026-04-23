import { Separator } from "@repo/ui/components/separator";

export function PageHeader() {
  return (
    <div className="text-center mt-12">
      <h1 className="text-7xl font-normal tracking-tight text-foreground mb-2">
        Ask AI
      </h1>
      <p className="text-sm text-muted-foreground">Get help with your plants</p>
      <Separator className="mt-6" />
    </div>
  );
}
