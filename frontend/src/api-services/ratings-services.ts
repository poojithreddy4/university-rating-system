import { useMutation, useQuery } from "@tanstack/react-query";
import { getAuthenticatedUser } from "../lib/utils";
import { http } from "./http";

const userId = getAuthenticatedUser()?.id;

// Post Rating Service
type RateUnivServiceDataType = {
  answers: Record<string, number>;
  univId: string;
};

const rateUnivService = async ({
  answers,
  univId,
}: RateUnivServiceDataType) => {
  const resp = await http.post(`/api/ratings/${univId}`, answers);
  return resp.data;
};

export const useRateUnivService = () => {
  return useMutation({
    mutationFn: rateUnivService,
  });
};

// Get rating respones
const getRatingsService = async (univId?: string) => {
  const resp = await http.get(`/api/ratings/${univId}`);
  return resp.data;
};

export const useGetRatingsService = (univId?: string) => {
  return useQuery({
    queryKey: ["getRatingsService", univId],
    queryFn: () => getRatingsService(univId),
    enabled: Boolean(univId) && Boolean(userId),
  });
};
