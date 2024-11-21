import { Box, Stack, Typography } from "@mui/material";

const Home = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap="1.5rem"
    >
      <Typography variant="h2">Welcome !</Typography>
      <Typography variant="body1" gap="3rem" display="flex">
        <Box component="span">Get Started.</Box>
        <Box component="span"> Rate Your University</Box>
        <Box component="span">Now We Are Real</Box>
      </Typography>
    </Stack>
  );
};

export default Home;
