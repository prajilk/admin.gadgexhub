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

type Res = {
  success: boolean;
  message: string;
};

type AdminProfileResProps = Res & {
  name: string;
};

type AdminProps = {
  id: string;
  name: string;
  role: "SUPERADMIN" | "ADMIN" | "GUEST";
  email: string;
};

type AdminsResProps = Res & {
  admins: AdminProps[];
};

type GuestUserProps = {
  user_id: string;
  expiration_date: string;
  status: "active" | "expired";
};

type GuestUserResProps = Res & {
  guest_users: GuestUserProps[];
};

type EditAdminResProps = Res & {
  admin: AdminProps | null;
};

export type {
  SummaryCardProps,
  AdminProfileResProps,
  AdminsResProps,
  GuestUserResProps,
  GuestUserProps,
  AdminProps,
  EditAdminResProps,
};
