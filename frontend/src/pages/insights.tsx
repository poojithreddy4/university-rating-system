import { Star, StarOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useGetUniversityService } from "../api-services/university-services";
import FullScreenLoader from "../components/full-screen-loader";
import RateNowModal from "../components/rate-now-modal";
import { getAuthenticatedUser } from "../lib/utils";

const Insights = () => {
  const { univId } = useParams();
  const { data, isLoading } = useGetUniversityService(univId);

  const [isRateNowModalOpen, setIsRateNowModalOpen] = useState(false);

  const isAuthenticated = getAuthenticatedUser();

  const handleRateNowClick = useCallback(() => {
    if (!isAuthenticated) return toast.error("Please login to continue");

    setIsRateNowModalOpen(true);
  }, [isAuthenticated]);

  const isBookmarked = false;

  if (!univId) return;

  return (
    <Box>
      <Toolbar />
      {/* Loading Screen */}
      <FullScreenLoader isLoading={isLoading} />

      {/* Main Information */}
      <Stack gap="1.5rem">
        {/* Image Banner */}
        <Box
          component="img"
          src={data?.image}
          width="100vw"
          height="30rem"
          sx={{
            height: "30rem",
            width: "100vw",
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
            Overall Rating: {(data?.overallRating ?? 0).toFixed?.(1)} / 5
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
            Rate Now
          </Button>
        </Stack>
      </Stack>

      {/* Modal */}
      <RateNowModal
        open={isRateNowModalOpen}
        onClose={() => setIsRateNowModalOpen(false)}
      />
    </Box>
  );
};

export default Insights;
