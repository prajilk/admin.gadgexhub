import { useQueryClient } from "@tanstack/react-query";
import { cache } from "react";

const getQueryClient = cache(() => useQueryClient());
export default getQueryClient;
