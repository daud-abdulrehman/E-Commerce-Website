import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import './SignUp.css'


const SignupSchema = Yup.object().shape({
  username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too Short!').required('Required'),
  isSeller: Yup.boolean(),
});

export const SignUp = () => {
  const [isSeller, setIsSeller] = useState(false);

  const handleSubmit = async (data) => {
    console.log("form submitted");
    // Add the isSeller value to the data object before sending to the server
    const formData = new FormData();
    formData.append("userName", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    // formData.append("image", data.image);
    formData.append("isSeller", isSeller);

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    // Print the object as a JSON string in a more readable form
    console.log(JSON.stringify(formDataObject, null, 2));
    data.isSeller = isSeller
    console.log("Data = ", data);
    console.log("IsSellerValue",data.isSeller)

    if(data.isSeller)
    {
      axios
      .post('/seller/signup', data)
      .then((response) => {
        // Handle the response data here
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
    }
    else{
      axios
      .post('/purchaser/signup', data)
      .then((response) => {
        // Handle the response data here
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
    }
  };

  return (
    <div className='signup-container'>
      <h1 className='signup-header'>Signup</h1>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          description: '',
          isSeller: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className='signup-form'>
            <TextField
              name="username"
              label="User Name"
              variant="outlined"
              className='input-field'
              error={Boolean(errors.username && touched.username)}
              helperText={errors.username && touched.username && String(errors.username)}
              onChange={(event) => {
                setFieldValue('username', event.target.value);
              } } />
            <br />

            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              className='input-field'
              error={Boolean(errors.email && touched.email)}
              helperText={errors.email && touched.email && String(errors.email)}
              onChange={(event) => {
                setFieldValue('email', event.target.value);
              } } />
            <br />

            <TextField
              name="password"
              label="Password"
              variant="outlined"
              className='input-field'
              error={Boolean(errors.password && touched.password)}
              helperText={errors.password && touched.password && String(errors.password)}
              onChange={(event) => {
                setFieldValue('password', event.target.value);
              } } />

            <FormControlLabel
              control={<Checkbox checked={isSeller} onChange={(event) => setIsSeller(event.target.checked)} name = "isSeller" />}
              label="Are you a Seller?" 
              name="isSeller"
              className='checkbox-field'
              />
            <br />

            <Button variant="contained" type="submit" className='submit-button'>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}


