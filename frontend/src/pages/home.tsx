import { Search } from "@mui/icons-material";
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";

const Home = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap="1.5rem"
      px={{ xs: "5rem", md: "10rem", lg: "20rem" }}
    >
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
        options={[]}
        sx={{ minWidth: "100%" }}
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
      />
    </Stack>
  );
};

export default Home;
