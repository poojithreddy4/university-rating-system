import { useMutation, useQuery } from "@tanstack/react-query";
import { http } from "./http";

// Update bookmark
type BookmarkServiceDataType = {
  universityId: string;
};
const bookmarkUniversityService = async (data: BookmarkServiceDataType) => {
  const resp = await http.post("/api/bookmark", data);
  return resp.data;
};

export const useBookmarkUniversityService = () => {
  return useMutation({
    mutationFn: bookmarkUniversityService,
  });
};

// Get bookmark
export const getBookmarksService = async () => {
  const resp = await http.get("/api/bookmark");
  return resp.data;
};

export const useGetBookmarkService = () => {
  return useQuery({
    queryKey: ["getBookmarksService"],
    queryFn: getBookmarksService,
  });
};
