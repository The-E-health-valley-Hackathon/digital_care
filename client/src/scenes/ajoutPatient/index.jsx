import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';

import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import { useState } from 'react';

const AjoutPatient = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [patientData, setPatientData] = useState(null);

  // Calculate IMC whenever height or weight changes
  const calculateIMC = (height, weight) => {
    if (!height || !weight) return '';
    const heightInMeters = height / 100; // Convert height from cm to meters
    const imc = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    return imc;
  };

  // Calculate Crawford Body Surface Area (BSA) whenever height or weight changes
  const calculateBSA = (poids, taille) => {
    if (!poids || !taille) return '';
    // const logpoids = Math.log10(poids);
    const x = 0.7285 - 0.0188 * Math.log(poids);
    const bsa = (
      0.0003207 *
      Math.pow(poids, x) *
      Math.pow(taille, 0.3)
    ).toFixed(2);
    return bsa;
  };

  const handleFormSubmit = async (values) => {
    console.log("values :" , values);
    try {
      const response = await axios.post(
        'http://localhost:3000/patient/add',
        values
      );
      if (response.status === 201) {
        // Update the patient data in state when the patient is added successfully
        setPatientData({ ...values, imc: calculateIMC(values.taille, values.poids), corporelle: calculateBSA(values.poids, values.taille) });
        // Show a success toast notification
        toast.success('Patient added successfully', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        // Show an error toast notification
        toast.error('Failed to add patient', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      // Show an error toast notification
      toast.error('An error occurred', {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error('An error occurred:', error);
    }
  };
  const initialValues = {
    prenom: '',
    nom: '',
    gender: '',
    age: 0, 
    poids: 0,
    taille: 0,
    corporelle: 0,
    imc: 0,
    doctors_id: 1,
    plasmatique: 14,
    clairance: 17,
    dateprotocole: '',
    dateadmission: '',
    typegreffe: '',
  };

  const validationSchema = yup.object().shape({
    typegreffe: yup.string().required('Type de greffe est requis'),
  });
  

  return (
    <Box m="20px">
      <Header title="Fiche de patient" subtitle="Créer un nouveau patient" />

      <Formik
                onSubmit={handleFormSubmit}

        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Prénom"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.prenom}
                name="prenom"
                error={!!touched.prenom && !!errors.prenom}
                helperText={touched.prenom && errors.prenom}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nom"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nom}
                name="nom"
                error={!!touched.nom && !!errors.nom}
                helperText={touched.nom && errors.nom}
                sx={{ gridColumn: 'span 2' }}
              />

              <TextField
                select
                fullWidth
                variant="filled"
                label="Gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                name="gender"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: 'span 2' }}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Poids"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  const imc = calculateIMC(values.taille, e.target.value);
                  const bsa = calculateBSA(e.target.value, values.taille);
                  setFieldValue('imc', imc);
                  setFieldValue('corporelle', bsa);
                }}
                value={values.poids}
                name="poids"
                error={!!touched.poids && !!errors.poids}
                helperText={touched.poids && errors.poids}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Taille"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  const imc = calculateIMC(e.target.value, values.poids);
                  const bsa = calculateBSA(values.poids, e.target.value);
                  setFieldValue('imc', imc);
                  setFieldValue('corporelle', bsa);
                }}
                value={values.taille}
                name="taille"
                error={!!touched.taille && !!errors.taille}
                helperText={touched.taille && errors.taille}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Surface corporelle (m²)"
                disabled // Prevent user from modifying BSA
                value={values.corporelle}
                name="corporelle"
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="IMC (poids/taille²)"
                disabled // Prevent user from modifying IMC
                value={values.imc}
                name="imc"
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Créatinine plasmatique (µmol/l)"
                disabled // Prevent user from modifying IMC
                value={values.plasmatique}
                name="plasmatique"
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Clairance créatinine (mL/min)"
                disabled // Prevent user from modifying IMC
                value={values.clairance}
                name="clairance"
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
  fullWidth
  variant="filled"
  type="date"
  label="Date de début de conditionnement / d'admission"
  onBlur={handleBlur}
  onChange={handleChange}
  value={values.dateadmission} // Use values.dateadmission
  name="dateadmission"
  error={!!touched.dateadmission && !!errors.dateadmission}
  helperText={touched.dateadmission && errors.dateadmission}
  sx={{ gridColumn: 'span 2' }}
/>
              <TextField
  select
  fullWidth
  variant="filled"
  label="Type de greffe"
  onBlur={handleBlur}
  onChange={handleChange}
  value={values.typegreffe}
  name="typegreffe"
  error={!!touched.typegreffe && !!errors.typegreffe}
  helperText={touched.typegreffe && errors.typegreffe}
  sx={{ gridColumn: 'span 2' }}
  SelectProps={{
    native: true,
  }}
>
  <option value="auto-greffe">Auto-greffe</option>
  <option value="allo-greffe">Allo-greffe</option>
  <option value="greffehapio">Greffe hapio-identique</option>
  <option value="pas-de-greffe">Pas de greffe</option>
</TextField>

<TextField
  fullWidth
  variant="filled"
  type="date"
  label="Date de la greffe / début de protocole"
  onBlur={handleBlur}
  onChange={handleChange}
  value={values.dateprotocole} // Use values.dateprotocole
  name="dateprotocole"
  error={!!touched.dateprotocole && !!errors.dateprotocole}
  helperText={touched.dateprotocole && errors.dateprotocole}
  sx={{ gridColumn: 'span 2' }}
/>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" onClick={handleSubmit} color="secondary" variant="contained">
                Ajouter patient
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};




export default AjoutPatient;
