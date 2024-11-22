import { Star, StarOutline } from "@mui/icons-material";
import { Box, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetUniversityService } from "../api-services/university-services";
import FullScreenLoader from "../components/full-screen-loader";

const Insights = () => {
  const { univId } = useParams();
  const { data, isLoading } = useGetUniversityService(univId);

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

        {/* Univ Name & Bookmark */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          padding="0 1rem"
        >
          {/* Name */}
          <Typography variant="h3" fontWeight="bold">
            {data?.name}
          </Typography>

          {/* Bookmark */}
          <Tooltip
            arrow
            title={
              isBookmarked ? "Remove from favourites" : "Mark as favourite"
            }
          >
            {isBookmarked ? (
              <Star fontSize="large" />
            ) : (
              <StarOutline fontSize="large" />
            )}
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Insights;
