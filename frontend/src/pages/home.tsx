import { Search } from "@mui/icons-material";
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetUniversitiesListService } from "../api-services/university-services";
import FullScreenLoader from "../components/full-screen-loader";

const Home = () => {
  const { data: universitiesList = [], isLoading } =
    useGetUniversitiesListService();

  const navigate = useNavigate();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap="1.5rem"
      px={{ xs: "5rem", md: "10rem", lg: "20rem" }}
    >
      {/* Loading Screen */}
      <FullScreenLoader isLoading={isLoading} />

      {/* Welcome */}
      <Typography variant="h2">Welcome !</Typography>

      {/* Sub title */}
      <Typography variant="body1" gap="3rem" display="flex">
        <Box component="span">Get Started.</Box>
        <Box component="span"> Rate Your University</Box>
        <Box component="span">Now We Are Real</Box>
      </Typography>

      {/* Search bar */}

      <Autocomplete
        disablePortal
        options={universitiesList}
        sx={{ minWidth: "100%" }}
        getOptionKey={(option) => option._id}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for University Name"
            InputProps={{
              ...params.InputProps,
              startAdornment: <Search fontSize="large" />,
              sx: {
                backgroundColor: "whitesmoke",
              },
            }}
          />
        )}
        onChange={(_, option) => {
          navigate(`/insights/${option?._id}`);
        }}
      />
    </Stack>
  );
};

export default Home;
