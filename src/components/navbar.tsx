import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar component="nav" color="warning" position="fixed">
      <Toolbar>
        <Typography letterSpacing={2}>RATE MY COLLEGE</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
