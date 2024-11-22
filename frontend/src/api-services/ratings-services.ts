import { useMutation } from "@tanstack/react-query";
import { http } from "./http";

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
