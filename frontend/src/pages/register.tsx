import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) =>
      setDetails((r) => ({ ...r, [target.name]: target.value })),
    []
  );

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
      <Typography variant="h3">Register</Typography>

      {/* Login Content */}
      <Stack gap="1.5rem" width={{ xs: "80%", md: "40%" }}>
        <Stack direction="row" alignItems="center" gap="2rem">
          {/* First Name */}
          <TextField
            variant="filled"
            placeholder="Enter your first name"
            label="First Name"
            name="firstName"
            value={details.firstName}
            onChange={handleInputChange}
            required
            fullWidth
          />

          {/* Last Name */}
          <TextField
            variant="filled"
            placeholder="Enter your last name"
            label="Last Name"
            name="lastName"
            value={details.lastName}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </Stack>
        {/* Email */}
        <TextField
          variant="filled"
          placeholder="Enter you email"
          type="email"
          label="Email"
          name="email"
          value={details.email}
          onChange={handleInputChange}
          required
        />

        {/* Password */}
        <TextField
          variant="filled"
          placeholder="Enter your password"
          type="password"
          label="Password"
          name="password"
          value={details.password}
          onChange={handleInputChange}
          required
        />

        <Button
          variant="contained"
          sx={{ mt: "1rem", alignSelf: "start" }}
          type="submit"
          color="warning"
        >
          Register
        </Button>
      </Stack>

      <Typography component={Link} to="/login">
        Already a user? Login here
      </Typography>
    </Stack>
  );
};

export default Register;
