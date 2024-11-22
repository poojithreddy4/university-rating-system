import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  return (
    <Stack
      height="100vh"
      alignItems="center"
      justifyContent="center"
      gap="2.5rem"
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(details);
      }}
    >
      {/* Login Text */}
      <Typography variant="h3">Login</Typography>

      {/* Login Content */}
      <Stack gap="1.5rem" width={{ xs: "80%", md: "40%" }}>
        {/* Email */}
        <TextField
          variant="filled"
          placeholder="Enter you email"
          type="email"
          label="Email"
          value={details.email}
          onChange={({ target }) =>
            setDetails((r) => ({ ...r, email: target.value }))
          }
          required
        />

        {/* Password */}
        <TextField
          variant="filled"
          placeholder="Enter your password"
          type="password"
          label="Password"
          value={details.password}
          onChange={({ target }) =>
            setDetails((r) => ({ ...r, password: target.value }))
          }
          required
        />

        <Button
          variant="contained"
          sx={{ mt: "1rem", alignSelf: "start" }}
          type="submit"
          color="warning"
        >
          Login
        </Button>
      </Stack>

      <Typography component={Link} to="/register">
        New user? Sign up here
      </Typography>
    </Stack>
  );
};

export default Login;
