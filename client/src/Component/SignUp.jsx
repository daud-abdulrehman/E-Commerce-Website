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


const SignupSchema = Yup.object().shape({
  username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too Short!').required('Required'),
  isSeller: Yup.boolean(),
});

export const SignUp = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [isSeller, setIsSeller] = useState(false);

  // const postImage = async (data) => {
  //   const formData = new FormData();
  //   formData.append('image', data.image);
  //   formData.append('description', data.description);

  //   const result = await axios.post('/images', formData, {
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //   });
  //   return result.data;
  // };

  const handleSubmit = async (data) => {
    // if (file) {
    //   const result = await postImage({ image: file, description: data.description });
    //   setImages([result.image, ...images]);
    // }

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


  // const fileSelected = (event) => {
  //   const file = event.target.files[0];
  //   setFile(file);
  // };

  return (
    <div style={{ padding: '50px' }}>
      <h1>Signup</h1>
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
          <Form>
            <TextField
              name="username"
              label="User Name"
              variant="outlined"
              error={Boolean(errors.username && touched.username)}
              helperText={errors.username && touched.username && String(errors.username)}
              onChange={(event) => {
                setFieldValue('username', event.target.value);
              } } />
            <br />
            <br />

            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              error={Boolean(errors.email && touched.email)}
              helperText={errors.email && touched.email && String(errors.email)}
              onChange={(event) => {
                setFieldValue('email', event.target.value);
              } } />
            <br />
            <br />

            <TextField
              name="password"
              label="Password"
              variant="outlined"
              error={Boolean(errors.password && touched.password)}
              helperText={errors.password && touched.password && String(errors.password)}
              onChange={(event) => {
                setFieldValue('password', event.target.value);
              } } />
            <br />
            <br />

            <FormControlLabel
              control={<Checkbox checked={isSeller} onChange={(event) => setIsSeller(event.target.checked)} name = "isSeller" />}
              label="Are you a Seller?" 
              name="isSeller"
              />
            <br />
            <br />
            {/* <p>Checkbox Value: {isSeller ? "Checked" : "Unchecked"}</p> */}

            {/* <input onChange={fileSelected} type="file" accept="image/*"></input>
            <TextField
              value={file ? file.name : ''}
              onChange={(e) => setFieldValue('description', e.target.value)}
              type="text"
              placeholder="Description" />

             {errors.image && touched.image && <div>{String(errors.image)}</div>}
            <br />
            <br /> */}

            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>

      {images.map((image) => (
        <div key={image}>
          <img src={image} alt="image"></img>
        </div>
      ))}
    </div>
  );
}


