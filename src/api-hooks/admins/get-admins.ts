import axios from "@/config/axios.config";
import { AdminsResProps } from "@/lib/types/types";
import { useQuery } from "@tanstack/react-query";

async function getAdminsClient() {
  const { data } = await axios.get("/api/admins");
  return data as AdminsResProps;
}

export function useGetAdmins() {
  return useQuery({
    queryKey: ["admins"],
    queryFn: getAdminsClient,
  });
}
