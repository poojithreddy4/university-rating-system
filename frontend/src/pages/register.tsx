import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useRegisterUserService } from "../api-services/auth-services";
import { getAuthenticatedUser, loginUser } from "../lib/utils";

const defaultDetails = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

type DetailsType = typeof defaultDetails;

const Register = () => {
  const [details, setDetails] = useState(defaultDetails);
  const [errors, setErrors] = useState(defaultDetails);

  const { mutate: registerUser, isPending } = useRegisterUserService();

  const handleInputChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      if (target.name === "confirmPassword") {
        setErrors((r) => ({ ...r, confirmPassword: "" }));
      } else if (target.name === "email") {
        setErrors((r) => ({ ...r, email: "" }));
      }
      setDetails((r) => ({ ...r, [target.name]: target.value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (data: DetailsType) => {
      const { confirmPassword, ...restData } = data;
      if (data.password !== confirmPassword) {
        return setErrors((r) => ({
          ...r,
          confirmPassword: "Password and confirm password must be same",
        }));
      }

      // Api call
      registerUser(restData, {
        onSuccess: (res) => loginUser(res),
        onError: (err) => {
          setErrors((r) => ({ ...r, email: err?.response?.data ?? "" }));
        },
      });
    },
    [registerUser]
  );

  const isAuthenticated = getAuthenticatedUser();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Stack
      height="100vh"
      alignItems="center"
      justifyContent="center"
      gap="2.5rem"
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(details);
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
          error={Boolean(errors.email)}
          helperText={errors.email}
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
          slotProps={{
            htmlInput: {
              minLength: 8,
            },
          }}
        />

        {/* Confirm Password */}
        <TextField
          variant="filled"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Enter your password again"
          required
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword}
          type="password"
          value={details.confirmPassword}
          onChange={handleInputChange}
        />

        <Button
          variant="contained"
          sx={{ mt: "1rem", alignSelf: "start" }}
          type="submit"
          color="warning"
          disabled={isPending}
          startIcon={isPending ? <CircularProgress size="1rem" /> : null}
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
