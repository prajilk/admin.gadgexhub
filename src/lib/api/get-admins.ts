import axios from "@/config/axios.config";
import { AdminsResProps } from "@/lib/types/types";
import { headers } from "next/headers";

export async function getAdminsServer() {
  const headerSequence = headers();
  const cookie = headerSequence.get("cookie");
  const { data } = await axios.get("/api/admins", {
    headers: {
      Cookie: `${cookie}`,
    },
  });

  return data as AdminsResProps;
}
