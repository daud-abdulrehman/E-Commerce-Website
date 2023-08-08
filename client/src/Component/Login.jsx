import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";

const LoginSchema = Yup.object().shape({
  password: Yup.string().min(8, "Too Short!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  isSeller: Yup.boolean(),
});

export const Login = () => {
  const [isSeller, setIsSeller] = useState(false);
  return (
    <div style={{ padding: "50px" }}>
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          isSeller: false,
        }}
        validationSchema={LoginSchema}
        onSubmit={async (data) => {
          let response;
          data.isSeller = isSeller
          try {
            if (isSeller) {
              // Make the login API call using Axios
              response = await axios.post(
                "/seller/signin",
                data
              );
            } else {
              response = await axios.post(
                "/purchaser/signin",
                data
              );
            }

            // Assuming the token is in the response as response.data.token
            const receivedToken = response.data;

            // Save the token to the local storage
            localStorage.setItem("token", receivedToken);
            console.log("Recieved token",receivedToken)

            // Handle any other actions after successful login
            console.log("Login successful!");
          } catch (error) {
            // Handle login error herea
            console.error("Login error:", error);
          }
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              error={Boolean(errors.email && touched.email)}
              helperText={errors.email && touched.email && String(errors.email)}
              onChange={(event) => {
                setFieldValue("email", event.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              name="password"
              label="password"
              variant="outlined"
              error={Boolean(errors.password && touched.password)}
              helperText={
                errors.password && touched.password && String(errors.password)
              }
              onChange={(event) => {
                setFieldValue("password", event.target.value);
              }}
            />
            <br />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isSeller}
                  onChange={(event) => setIsSeller(event.target.checked)}
                  name="isSeller"
                />
              }
              label="Are you a Seller?"
              name="isSeller"
            />
            <br />
            <br />

            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
            <br />
            <br />
          </Form>
        )}
      </Formik>
    </div>
  );
};
