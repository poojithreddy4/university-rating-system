import { useQuery } from "@tanstack/react-query";
import { http } from "./http";

/**
 * ========== Univerisities API's ============
 */
export type UniversityRecordType = {
  _id: string;
  name: string;
  image: string;
};

// All universities
const getUniversitiesListService = async () => {
  const resp = await http.get<UniversityRecordType[]>("/api/universities");
  return resp.data;
};

export const useGetUniversitiesListService = () => {
  return useQuery({
    queryKey: ["useGetUniversitiesListService"],
    queryFn: getUniversitiesListService,
  });
};

// Single University
const getUniversityService = async (univId?: string) => {
  const resp = await http.get<UniversityRecordType>(
    `/api/universities/${univId}`
  );
  return resp.data;
};

export const useGetUniversityService = (univId?: string) => {
  return useQuery({
    queryKey: ["useGetUniversityService", univId],
    queryFn: () => getUniversityService(univId),
    enabled: Boolean(univId),
  });
};
