import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';

function AddFicheFabrication() {
  const initialValues = {
    medicament: '',
    nomPatient: '',
    service: '',
    sc: '',
    dose: '',
    protocole: '',
    doseFinal: '',
    dateFabrication: '',
    nOrdennacier: '',
    manipulateur: '',
    preleve1: '',
    preleve2: '',
    inject: '',
    volume: '',
    concentration: '',
    conditionnement: '',
    stabilite: '',
    nomEditer: '',
    nomVerifier: '',
  };

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:3000/fabrication/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.status === 201) {
        console.log('Fiche Fabrication added successfully');
      } else {
        console.error('Error adding Fiche Fabrication');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = yup.object().shape({
    medicament: yup.string().required('Required'),
    nomPatient: yup.string().required('Required'),
    // Add validation for other fields as needed
  });

  return (
    <Box m="20px">
      <h1>Add Fiche Fabrication</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field
                name="medicament"
                type="text"
                label="Medicament:"
                as={TextField}
                fullWidth
                variant="filled"
                required
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="nomPatient"
                type="text"
                label="Nom Patient:"
                as={TextField}
                fullWidth
                variant="filled"
                required
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="service"
                type="text"
                label="Service:"
                as={TextField}
                fullWidth
                variant="filled"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="sc"
                type="text"
                label="SC:"
                as={TextField}
                fullWidth
                variant="filled"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="dose"
                type="text"
                label="Dose:"
                as={TextField}
                fullWidth
                variant="filled"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="protocole"
                type="text"
                label="Protocole:"
                as={TextField}
                fullWidth
                variant="filled"
                sx={{ width: '100%' }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Field
                name="doseFinal"
                type="text"
                label="Dose Final:"
                as={TextField}
                fullWidth
                variant="filled"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="dateFabrication"
                type="date"
                label="Date Fabrication:"
                as={TextField}
                fullWidth
                variant="filled"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="nOrdennacier"
                type="text"
                label="nOrdennacier:"
                as={TextField}
                fullWidth
                variant="filled"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="manipulateur"
                type="text"
                label="Manipulateur:"
                as={TextField}
                fullWidth
                variant="filled"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="preleve1"
                type="text"
                label="Preleve1:"
                as={TextField}
                fullWidth
                variant="filled"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="preleve2"
                type="text"
                label="Preleve2:"
                as={TextField}
                fullWidth
                variant="filled"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="inject"
                type="text"
                label="Inject:"
                as={TextField}
                fullWidth
                variant="filled"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="volume"
                type="text"
                label="Volume:"
                as={TextField}
                fullWidth
                variant="filled"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="concentration"
                type="text"
                label="Concentration:"
                as={TextField}
                fullWidth
                variant="filled"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="conditionnement"
                type="text"
                label="Conditionnement:"
                as={TextField}
                fullWidth
                variant="filled"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="stabilite"
                type="text"
                label="Stabilite:"
                as={TextField}
                fullWidth
                variant="filled"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="nomEditer"
                type="text"
                label="Nom Editer:"
                as={TextField}
                fullWidth
                variant="filled"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="nomVerifier"
                type="text"
                label="Nom Verifier:"
                as={TextField}
                fullWidth
                variant="filled"
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              width: '40%',
              backgroundColor: 'white',
              color: 'black',
              fontWeight: 'bold',
              fontSize: '200%',
              marginRight: '30px',
              top: '20px',
            }}
          >
            Add Fiche Fabrication
          </Button>
        </Form>
      </Formik>
    </Box>
  );
}

export default AddFicheFabrication;
