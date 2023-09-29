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

function Etiquette() {
  const initialValues = {
    nomMedicament: '',
    service: '',
    dateFabrication: '',
    dateAdministration: '',
    conservation: '',
  };
  const handlePrint = () => {
    const contentToPrint = document.querySelector('.print-content'); 
    if (contentToPrint) {
      const printWindow = window.open('', '', 'width=600,height=600');
      printWindow.document.open();
      printWindow.document.write('<html><head><title>Print</title></head><body>');
      printWindow.document.write('<h2>Etiquette Details</h2>');
      printWindow.document.write(contentToPrint.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    } else {
      console.error('Content to print not found');
    }
  };
  
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [etiquetteData, setEtiquetteData] = useState(null); 

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:3000/etiquette/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.status === 201) {
        console.log('Etiquette added successfully');
      } else {
        console.error('Error creating Etiquette');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = yup.object().shape({
    nomMedicament: yup.string().required('Required'),
    service: yup.string().required('Required'),
    dateFabrication: yup.date().required('Required'),
    dateAdministration: yup.date().required('Required'),
    conservation: yup.string().required('Required'),
  });

  const handleGetEtiquette = async () => {
    try {
      const response = await fetch('http://localhost:3000/etiquette/get');
      if (response.status === 200) {
        const data = await response.json();
        setEtiquetteData(data);
        setIsDialogOpen(true); // Open the dialog
      } else {
        console.error('Error fetching Etiquette');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <Box m="20px">
      <h1>Add Etiquette</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field
                name="nomMedicament"
                type="text"
                label="Nom Medicament:"
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
                required
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
                required
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="dateAdministration"
                type="date"
                label="Date Administration:"
                as={TextField}
                fullWidth
                variant="filled"
                required
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="conservation"
                type="text"
                label="Conservation:"
                as={TextField}
                fullWidth
                variant="filled"
                required
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
    top:'20px'
  }}
>
  Ajouter Etiquette
</Button>
<Button
  variant="contained"
  color="primary"
  sx={{
    width: '40%',
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '200%',
    marginLeft: '30px', 
    top:'20px'

  }}
  onClick={handleGetEtiquette}
>
  Imprimer Etiquette
</Button>

        </Form>
      </Formik>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Etiquette Data</DialogTitle>
        <DialogContent>
          {etiquetteData && (
            <pre>{JSON.stringify(etiquetteData, null, 2)}</pre>
          )}
        </DialogContent>
        <DialogActions>
    {etiquetteData && (
      <Button onClick={handlePrint} color="primary">
      Print
    </Button>
    
    )}
    <Button onClick={handleCloseDialog} color="primary">
      Close
    </Button>
  </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Etiquette;
