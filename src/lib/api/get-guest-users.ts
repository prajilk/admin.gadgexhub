import axios from "@/config/axios.config";
import { GuestUserResProps } from "@/lib/types/types";
import { headers } from "next/headers";

export async function getGuestUsersServer() {
  const headerSequence = headers();
  const cookie = headerSequence.get("cookie");
  const { data } = await axios.get("/api/guest-users", {
    headers: {
      Cookie: `${cookie}`,
    },
  });

  return data as GuestUserResProps;
}
