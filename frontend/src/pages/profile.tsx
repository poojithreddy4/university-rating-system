import { Delete, Edit, PersonOutline } from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Rating,
  Stack,
  StackProps,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetBookmarksListService } from "../api-services/bookmark-service";
import {
  useDeleteUserRatingService,
  useGetUserRatingsService,
  UserRatingObjectType,
} from "../api-services/ratings-services";
import {
  useGetUserDetailsService,
  useUpdateUserDetailsService,
} from "../api-services/user-services";
import CustomRadio, { OptionType } from "../components/custom-radio";
import FullScreenLoader from "../components/full-screen-loader";
import RateNowModal from "../components/rate-now-modal";
import { getAuthenticatedUser, UserVisibilityType } from "../lib/utils";

const Profile = () => {
  const user = getAuthenticatedUser();

  const { data: userRatings, isLoading } = useGetUserRatingsService();

  const averageRating = getAverageRating(userRatings);

  const [selectedUniversity, setSelectedUniversity] = useState<string | null>();

  const { mutate: deleteUserRating, isPending } = useDeleteUserRatingService();

  const { data: bookmarksList, isLoading: isLoadingBookmarks } =
    useGetBookmarksListService();

  const { mutate: updateUserDetails, isPending: isPendingUserDetails } =
    useUpdateUserDetailsService();

  const { data: userDetails, isLoading: isLoadingUserDetails } =
    useGetUserDetailsService();

  return (
    <>
      {/* Main Layout */}
      <Stack>
        <Toolbar />
        {/* Loading Screen */}
        <FullScreenLoader
          isLoading={
            isLoading ||
            isPending ||
            isLoadingBookmarks ||
            isPendingUserDetails ||
            isLoadingUserDetails
          }
        />

        {/* Main Content */}
        <Stack p="1.5rem" gap="2rem">
          {/* Page Title */}
          <Typography variant="h3" align="center">
            My Profile
          </Typography>

          {/* User Information */}
          <Stack
            direction="row"
            alignItems="start"
            gap="2rem"
            flexWrap={{ xs: "wrap", lg: "nowrap" }}
          >
            {/* Left container */}
            <Stack width={{ xs: "100%", lg: "20rem" }} gap="2.5rem">
              {/* User Avatar & Name */}
              <InfoCard>
                <Box p="0.5rem" border="1px solid lightgray" borderRadius="50%">
                  <PersonOutline fontSize="large" sx={{ fontSize: "4rem" }} />
                </Box>
                <Typography variant="h6">
                  {user?.firstName + " " + user?.lastName}
                </Typography>
              </InfoCard>

              {/* No of Reviews */}
              <InfoCard label="Number of Reviews">
                <Typography variant="h3">{userRatings?.length}</Typography>
              </InfoCard>

              {/* Average Rating */}
              <InfoCard label="Your Average Rating">
                <Rating
                  readOnly
                  size="large"
                  value={averageRating}
                  precision={0.1}
                />
              </InfoCard>
            </Stack>

            {/* Middle Container */}
            <Stack flexGrow={1} gap="2.5rem">
              {/* My Ratings */}
              <InfoCard
                alignItems="start"
                justifyContent="start"
                height="calc(10.5rem * 2 + 2.5rem)"
                label="My Ratings"
              >
                <Stack overflow="auto" width="100%">
                  {/* List of ratings */}
                  <List>
                    {userRatings?.map((rating, idx) => (
                      <ListItem key={rating._id} divider>
                        <ListItemText
                          primaryTypographyProps={{
                            component: "div",
                          }}
                          primary={
                            <Stack
                              direction="row"
                              alignItems="center"
                              gap="3rem"
                            >
                              {/* University Name */}
                              <Typography variant="h6" width="25rem">
                                {idx + 1}.{" "}
                                <Typography
                                  component={Link}
                                  variant="h6"
                                  to={`/insights/${rating.universityId._id}`}
                                >
                                  {rating.universityId?.name}
                                </Typography>
                              </Typography>

                              {/* Rating */}
                              <Rating
                                readOnly
                                value={rating.overallRating}
                                precision={0.1}
                              />

                              {/* Edit */}
                              <Tooltip title="Edit Rating" arrow>
                                <IconButton
                                  color="primary"
                                  onClick={() =>
                                    setSelectedUniversity(
                                      rating.universityId._id
                                    )
                                  }
                                >
                                  <Edit />
                                </IconButton>
                              </Tooltip>

                              {/* Delete */}
                              <Tooltip title="Delete Rating" arrow>
                                <IconButton
                                  color="error"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        `Are you sure want to delete your rating for ${rating.universityId.name}?`
                                      )
                                    ) {
                                      deleteUserRating(rating.universityId._id);
                                    }
                                  }}
                                >
                                  <Delete />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Stack>
              </InfoCard>

              {/* Bookmarks */}
              <InfoCard
                label="My Favourites"
                alignItems="start"
                justifyContent="start"
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  gap="2rem"
                  overflow="auto"
                  width="100%"
                >
                  {bookmarksList?.map?.((b) => {
                    if (!b.isBookmarked) return;
                    return (
                      <Stack
                        key={b._id}
                        alignItems="center"
                        justifyContent="center"
                        title={b.universityId.name}
                        component={Link}
                        to={`/insights/${b.universityId._id}`}
                        sx={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Box
                          component="img"
                          src={b.universityId.image}
                          sx={{
                            width: "4rem",
                            height: "4rem",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                        <Typography
                          width="5rem"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          {b.universityId.name}
                        </Typography>
                      </Stack>
                    );
                  })}
                </Stack>
              </InfoCard>
            </Stack>

            {/* Right Container */}
            <Stack width={{ xs: "100%", lg: "20rem" }}>
              <InfoCard
                label="Account Settings"
                alignItems="start"
                justifyContent="start"
                height="calc(10.5rem * 3 + 2.5rem * 2)"
              >
                <Box mt="1rem">
                  <CustomRadio
                    label="Profile Visibility"
                    options={profileVisibilityOptions}
                    value={userDetails?.visibility ?? null}
                    onChange={(_, newVal) =>
                      updateUserDetails({
                        visibility: newVal as UserVisibilityType,
                      })
                    }
                  />
                </Box>
              </InfoCard>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* Dialogs */}
      <RateNowModal
        open={Boolean(selectedUniversity)}
        onClose={() => setSelectedUniversity(null)}
        universityId={selectedUniversity ?? ""}
      />
    </>
  );
};

export default Profile;

// ========= INFO CARD ========
type InfoCardProps = StackProps & {
  label?: string;
};
const InfoCard = ({ children, label, ...rest }: InfoCardProps) => {
  return (
    <Stack
      p="1rem"
      direction="column"
      alignItems="center"
      gap="0.5rem"
      component={Paper}
      sx={{ bgcolor: "background.default" }}
      height="10.5rem"
      border="1px solid lightgray"
      borderRadius="1rem"
      justifyContent="center"
      {...rest}
    >
      {label && (
        <Typography variant="h6" fontWeight="bold">
          {label}
        </Typography>
      )}
      {children}
    </Stack>
  );
};

// ======= Utils ========
const getAverageRating = (userRatings?: UserRatingObjectType[]) => {
  if (!userRatings || userRatings.length === 0) return 0;

  let finalRating = 0;
  userRatings.forEach((rating) => {
    finalRating += rating.overallRating;
  });

  return finalRating / userRatings.length;
};

const profileVisibilityOptions: OptionType<string, UserVisibilityType>[] = [
  {
    label: "Public",
    value: "public",
  },
  {
    label: "Anonymous",
    value: "anonymous",
  },
];
