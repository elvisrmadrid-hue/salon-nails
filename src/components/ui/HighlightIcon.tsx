import type { HighlightIcon } from "@/data/content";
import { BrushIcon, HeartIcon, ShieldIcon, SparkleIcon } from "@/components/ui/Icons";

const map = { heart: HeartIcon, shield: ShieldIcon, sparkle: SparkleIcon, brush: BrushIcon };

export function HighlightIconView({ icon }: { icon: HighlightIcon }) {
  const Icon = map[icon];
  return <Icon />;
}
