import axios from "@/config/axios.config";
import { GuestUserResProps } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";

async function getGuestUsersClient() {
  const { data } = await axios.get("/api/guest-users");
  return data as GuestUserResProps;
}

export function useGetGuestUsers() {
  return useQuery({
    queryKey: ["guest-users"],
    queryFn: getGuestUsersClient,
  });
}
