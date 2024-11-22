import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import { Link, NavLink, NavLinkProps } from "react-router-dom";
import { getAuthenticatedUser } from "../lib/utils";

const Navbar = () => {
  const isAuthenticated = getAuthenticatedUser();

  return (
    <AppBar component="nav" color="warning" position="fixed">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Website Name */}
        <Typography
          component={Link}
          to="/"
          letterSpacing={2}
          color="white"
          sx={{ textDecoration: "none" }}
        >
          RATE MY COLLEGE
        </Typography>

        {/* Navlinks */}
        <Stack direction="row" gap="1.5rem" alignItems="center">
          {defaultNavLinks.map((navlink) => (
            <CustomNavLink key={navlink.label} to={navlink.path}>
              {navlink.label}
            </CustomNavLink>
          ))}

          {!isAuthenticated
            ? unAuthenticatedNavLinks.map((navlink) => (
                <CustomNavLink key={navlink.label} to={navlink.path}>
                  {navlink.label}
                </CustomNavLink>
              ))
            : null}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

/**
 * ====== NAVLINKS ========
 */

const defaultNavLinks = [
  {
    label: "Home",
    path: "/",
  },
];

const unAuthenticatedNavLinks = [
  {
    label: "Login",
    path: "/login",
  },
];

const CustomNavLink = (props: NavLinkProps & { children: React.ReactNode }) => {
  return (
    <NavLink
      {...props}
      to={props.to}
      style={({ isActive }) => ({
        color: "white",
        textDecoration: isActive ? "underline" : "none",
      })}
    >
      <Typography>{props.children}</Typography>
    </NavLink>
  );
};
