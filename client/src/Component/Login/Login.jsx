import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import './Login.css'

const LoginSchema = Yup.object().shape({
  password: Yup.string().min(8, "Too Short!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  isSeller: Yup.boolean(),
});

export const Login = () => {
  const [isSeller, setIsSeller] = useState(false);

  return (
    <div className="login-container">
      <h1 className="login-header">Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          isSeller: false,
        }}
        validationSchema={LoginSchema}
        onSubmit={async (data) => {
          let response;
          data.isSeller = isSeller;
          try {
            if (isSeller) {
              // Make the login API call using Axios
              response = await axios.post("/seller/signin", data);
            } else {
              response = await axios.post("/purchaser/signin", data);
            }

            // Assuming the token is in the response as response.data.token
            const receivedToken = response.data;

            // Save the token to the local storage
            localStorage.setItem("token", receivedToken);
            console.log("Recieved token", receivedToken);

            // Handle any other actions after successful login
            console.log("Login successful!");
          } catch (error) {
            // Handle login error herea
            console.error("Login error:", error);
          }
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="login-form">
             <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              className="input-field"
              error={Boolean(errors.email && touched.email)}
              helperText={errors.email && touched.email && String(errors.email)}
              onChange={(event) => {
                setFieldValue("email", event.target.value);
              }}
            />
            <br />
            <TextField
              name="password"
              label="password"
              variant="outlined"
              className="input-field"
              error={Boolean(errors.password && touched.password)}
              helperText={
                errors.password && touched.password && String(errors.password)
              }
              onChange={(event) => {
                setFieldValue("password", event.target.value);
              }}
            />
            {/* <br /> */}
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
              className="checkbox-field"
            />
            <br />
            
            {/* "Submit" button */}
            <Button variant="contained" type="submit" className={"submit-button"}>
              Submit
            </Button>
            <br />
            {/* "Sign Up" button */}
            <Button color="inherit">
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Don't have an account? Sign Up
              </Link>
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
