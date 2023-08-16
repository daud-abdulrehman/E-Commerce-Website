import React, { useState } from "react";
import axios from 'axios';
import { TextField, Button, Card, CardContent, CircularProgress,Typography } from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
import './CreateProduct.css';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";


const ProductSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  price: Yup.number().required('Required'),
  description: Yup.string().min(8, 'Too Short!').required('Required'),
  stock: Yup.number().required('Required'),
  image: Yup.mixed().required("Please select an image file."),

});

const CreateProduct = () => 
{
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  return (
    <div className="create-product-container">
      <h1 className="create-product-header">Create Product</h1>
      <Card className="create-product-form">
        <CardContent>
          <Typography variant="h6" className="create-product-header">
            Create Product
          </Typography>
          <Formik
            initialValues={{
              name: '',
              price: '',
              description: '',
              stock: '',
              image:null,
            }}
            validationSchema={ProductSchema}
            onSubmit={async (values) => {
              setIsLoading(true);
              setError(null);

              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("price", values.price);
              formData.append("description", values.description);
              formData.append("stock", values.stock);
              formData.append("image", values.image);

              console.log("Product Data:",values)

              try {
                const response = await axios.post("/seller/createproduct", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    token: localStorage.getItem("token"),
                  },
                });
                console.log("Product added successfully:", response.data);
                setIsLoading(false);
                navigate("/");
              } catch (error) {
                console.error("Error adding product:", error.message);
                setError("Error adding product. Please try again.");
                setIsLoading(false);
              }
            }}          >
            {({ values, setFieldValue, handleSubmit, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={values.name}
                  error={Boolean(errors.name && touched.name)}
                  helperText={errors.name && touched.name && String(errors.name)}
                  onChange={(event) => {
                    setFieldValue('name', event.target.value);
                  } }   

                  className="create-product-input"
                />
                <br /><br />
                <TextField
                  label="Price"
                  variant="outlined"
                  name="price"
                  value={values.price}
                  error={Boolean(errors.price && touched.price)}
                  helperText={errors.price && touched.name && String(errors.price)}
                  onChange={(event) => {
                    setFieldValue('price', event.target.value);
                  } }                   
                  className="create-product-input"
                />
                <br /><br />
                <TextField
                  label="Description"
                  variant="outlined"
                  name="description"
                  value={values.description}
                  error={Boolean(errors.description && touched.description)}
                  helperText={errors.description && touched.description && String(errors.description)}
                  onChange={(event) => {
                    setFieldValue('description', event.target.value);
                  } }                   
                  className="create-product-input"
                />
                <br /><br />
                <TextField
                  label="Stock"
                  variant="outlined"
                  name="stock"
                  value={values.stock}
                  error={Boolean(errors.stock && touched.stock)}
                  helperText={errors.stock && touched.stock && String(errors.stock)}
                  onChange={(event) => {
                    setFieldValue('stock', event.target.value);
                  } }                                     
                  className="create-product-input"
                />
                 <TextField
                  name="image"
                  variant="standard"
                  type="file"
                  error={Boolean(errors.image && touched.image)}
                  helperText={
                    errors.image && touched.image && String(errors.image)
                  }
                  onChange={(event) => {
                    setFieldValue("image", event.target.files[0]);
                    setUploadedImage(
                      URL.createObjectURL(event.target.files[0])
                    );
                  }}
                />
                <br />
                <br />
                <div className="ProductImageSection">
                  {uploadedImage && (
                    <img
                      src={uploadedImage}
                      alt="Uploaded Product"
                      className="uploaded-image"
                      style={{ height: "100px", width: "100%" }}
                    />
                  )}
                </div>
                <div className="button-container">
                  {isLoading ? (
                    <CircularProgress className="loader" />
                  ) : (
                    <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="create-product-submit"
                    >
                      Create Product
                    </Button>
                  )}
                <br /><br />
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProduct;
