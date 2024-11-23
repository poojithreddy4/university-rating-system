import { useMutation, useQuery } from "@tanstack/react-query";
import { getAuthenticatedUser } from "../lib/utils";
import { http } from "./http";
import { UniversityRecordType } from "./university-services";

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

// Get No.of Reviews

export type UserRatingObjectType = {
  _id: string;
  universityId: UniversityRecordType;
  userId: string;
  answers: [
    {
      questionId: string;
      answer: number;
    }
  ];
  overallRating: number;
};

const getUserRatingsService = async () => {
  const resp = await http.get<UserRatingObjectType[]>("/api/ratings");
  return resp.data;
};

export const useGetUserRatingsService = () => {
  return useQuery({
    queryKey: ["getUserRatingsService"],
    queryFn: getUserRatingsService,
  });
};

// Delete Rating
const deleteUserRatingService = async (univId: string) => {
  const resp = await http.delete<string>(`/api/ratings/${univId}`);
  return resp.data;
};
export const useDeleteUserRatingService = () => {
  return useMutation({
    mutationFn: deleteUserRatingService,
  });
};
