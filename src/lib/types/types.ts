import { LucideIcon } from "lucide-react";

type SummaryCardProps = {
  icon: LucideIcon;
  title: string;
  value: number;
  url: string;
  color: string;
  bgcolor: string;
  percentage?: { increased: boolean; value: string | number };
};

export type { SummaryCardProps };
