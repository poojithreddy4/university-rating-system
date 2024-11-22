import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:9000" : "";

export const http = axios.create({
  baseURL: BASE_URL,
});

export const queryClient = new QueryClient();
