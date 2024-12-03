import { Star, StarOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  useBookmarkUniversityService,
  useGetBookmarkService,
} from "../api-services/bookmark-service";
import {
  OtherUserUnivRatingsRecordType,
  useGetOtherPeopleUnivRatings,
  useGetRatingsService,
} from "../api-services/ratings-services";
import { useGetUniversityService } from "../api-services/university-services";
import FullScreenLoader from "../components/full-screen-loader";
import RateNowModal from "../components/rate-now-modal";
import ViewRatingsModal from "../components/view-ratings-modal";
import { getAuthenticatedUser } from "../lib/utils";

const Insights = () => {
  const { univId } = useParams();
  const { data, isLoading } = useGetUniversityService(univId);

  const [isRateNowModalOpen, setIsRateNowModalOpen] = useState(false);
  const [selectedResponse, setSelectedResponse] =
    useState<OtherUserUnivRatingsRecordType | null>();

  const isAuthenticated = getAuthenticatedUser();

  const { data: answerRespData } = useGetRatingsService(univId);

  const answerResps = answerRespData?.answers;

  const { mutate: toggleBookmark, isPending } = useBookmarkUniversityService();

  const { data: bookmarkObj, isLoading: isLoadingBookmarks } =
    useGetBookmarkService();

  const { data: otherRatingsList, isLoading: isLoadingOtherRatings } =
    useGetOtherPeopleUnivRatings(univId);

  const isRatingAvailable = Object.keys(answerResps ?? {}).length > 0;

  const handleRateNowClick = useCallback(() => {
    if (!isAuthenticated) return toast.error("Please login to continue");

    setIsRateNowModalOpen(true);
  }, [isAuthenticated]);

  if (!univId) return;

  const isBookmarked = bookmarkObj?.[univId];

  return (
    <Box>
      <Toolbar />
      {/* Loading Screen */}
      <FullScreenLoader
        isLoading={
          isLoading || isPending || isLoadingBookmarks || isLoadingOtherRatings
        }
      />

      {/* Main Information */}
      <Stack gap="1.5rem">
        {/* Image Banner */}
        <Box
          component="img"
          src={data?.image}
          width="99vw"
          height="30rem"
          sx={{
            height: "30rem",
            width: "99vw",
            objectFit: "cover",
          }}
        />

        {/* Details Container */}
        <Stack padding="0 1rem" gap="1rem">
          {/* Univ Name & Bookmark */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Name */}
            <Typography variant="h4" fontWeight="bold">
              {data?.name}
            </Typography>

            {/* Bookmark */}
            <Tooltip
              arrow
              title={
                isAuthenticated
                  ? isBookmarked
                    ? "Remove from favourites"
                    : "Mark as favourite"
                  : "Please login to bookmark this university"
              }
            >
              <IconButton
                onClick={() => {
                  if (!isAuthenticated) return;
                  toggleBookmark({ universityId: univId });
                }}
              >
                {isBookmarked ? (
                  <Star fontSize="large" />
                ) : (
                  <StarOutline fontSize="large" />
                )}
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Overall Rating */}
          <Typography variant="h5" fontWeight="bold">
            Overall Rating:{" "}
            {(data?.noOfRatings ?? 0) === 0
              ? "N/A"
              : (data?.overallRating ?? 0).toFixed?.(1) + " / 5"}
          </Typography>

          {/* Your Rating */}
          <Typography variant="h5" fontWeight="bold">
            Your Rating:{" "}
            {isRatingAvailable
              ? `${answerRespData?.overallRating?.toFixed(1)} / 5`
              : "N/A"}
          </Typography>

          {/* Number of reviews */}
          <Typography variant="h6">
            {data?.noOfRatings ?? 0} people reviewed this university.
          </Typography>

          {/* Rate Now  */}
          <Button
            size="large"
            color="warning"
            variant="contained"
            sx={{ alignSelf: "end" }}
            onClick={handleRateNowClick}
          >
            {isRatingAvailable ? "Edit Ratings" : "Rate Now"}
          </Button>

          {/* Other people reviews */}
          <Stack gap="1rem">
            <Typography variant="h6" fontWeight="bold">
              Ratings given by other people
            </Typography>

            {/* Other Ratings Table */}
            {otherRatingsList && otherRatingsList.length > 0 ? (
              <Table>
                {/* Table Head */}
                <TableHead>
                  <TableRow>
                    {tableColumns.map((c) => (
                      <TableCell variant="head" key={c.headerName}>
                        {c.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                {/* Table Body */}
                <TableBody>
                  {otherRatingsList?.map((item, index) => (
                    <TableRow key={item._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.userId.name}</TableCell>
                      <TableCell>
                        <Rating
                          readOnly
                          value={item.overallRating}
                          precision={0.1}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          color="warning"
                          onClick={() => setSelectedResponse(item)}
                        >
                          View Responses
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography variant="h6">No reviews available</Typography>
            )}
          </Stack>
        </Stack>
      </Stack>

      {/* Modal */}
      <RateNowModal
        open={isRateNowModalOpen}
        onClose={() => setIsRateNowModalOpen(false)}
        universityId={univId}
      />

      {/* View Ratings Modal */}
      <ViewRatingsModal
        open={Boolean(selectedResponse)}
        universityId={univId}
        answers={selectedResponse?.answers}
        onClose={() => setSelectedResponse(null)}
      />
    </Box>
  );
};

export default Insights;

/**
 * ======= Table columns =======
 */
const tableColumns = [
  {
    headerName: "index",
    label: "S.No.",
  },
  {
    headerName: "name",
    label: "Name",
  },
  {
    headerName: "rating",
    label: "Rating Provided",
  },
  {
    headerName: "view-responses",
    label: "",
  },
];
