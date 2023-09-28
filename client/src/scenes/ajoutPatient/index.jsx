import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';


const AjoutPatient = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  // Calculate IMC whenever height or weight changes
  const calculateIMC = (height, weight) => {
    if (!height || !weight) return '';
    const heightInMeters = height / 100; // Convert height from cm to meters
    const imc = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    return imc;
  };

  // Calculate Crawford Body Surface Area (BSA) whenever height or weight changes
  const calculateBSA = (poids, taille) => {
    if (!poids || !taille) return "";
    // const logpoids = Math.log10(poids);
    const x = 0.7285 - 0.0188 * ( Math.log(poids));
    const bsa = (
      0.0003207 *
      Math.pow(poids , x  ) *
      Math.pow(taille, 0.3)
    ).toFixed(2);
    return bsa;
  };

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="Fiche de patient" subtitle="Créer un nouveau patient" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
                <option value="Homme">Male</option>
                <option value="Femme">Female</option>
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
                setFieldValue("imc", imc);
                setFieldValue("corporelle", bsa);
              }}
              value={values.poids}
              name="poids"
              error={!!touched.poids && !!errors.poids}
              helperText={touched.poids && errors.poids}
              sx={{ gridColumn: "span 2" }}
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
                setFieldValue("imc", imc);
                setFieldValue("corporelle", bsa);
              }}
              value={values.taille}
              name="taille"
              error={!!touched.taille && !!errors.taille}
              helperText={touched.taille && errors.taille}
              sx={{ gridColumn: "span 2" }}
            />
              <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Surface corporelle (m²)"
              disabled // Prevent user from modifying BSA
              value={values.corporelle}
              name="corporelle"
              sx={{ gridColumn: "span 2" }}
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
                value={values.creatine}
                name="imc"
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Clairance créatinine (mL/min)"
                disabled // Prevent user from modifying IMC
                value={values.creatine}
                name="imc"
                sx={{ gridColumn: 'span 2' }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="date" // Use type="date" for date input
                label="Date de début de conditionnement / d'admission"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                error={!!touched.date && !!errors.date}
                helperText={touched.date && errors.date}
                sx={{ gridColumn: 'span 2' }}
              />
<FormControl component="fieldset" sx={{ gridColumn: 'span 2' }}>
  <FormLabel component="legend">Type de greffe</FormLabel>
  <RadioGroup
    row
    aria-label="type-de-greffe"
    name="typeDeGreffe"
    value={values.typeDeGreffe}
    onChange={handleChange}
  >
    <FormControlLabel
      value="auto-greffe"
      control={<Radio />}
      label="Auto-greffe"
    />
    <FormControlLabel
      value="allo-greffe"
      control={<Radio />}
      label="Allo-greffe"
    />
    <FormControlLabel
      value="greffehapio"
      control={<Radio />}
      label="Greffe hapio-identique"
    />
    <FormControlLabel
      value="pas-de-greffe"
      control={<Radio />}
      label="Pas de greffe"
    />
  </RadioGroup>
</FormControl>


<TextField
                fullWidth
                variant="filled"
                type="date" // Use type="date" for date input
                label="Date de la greffe  / début de protocole"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="dategreffe"
                error={!!touched.dategreffe && !!errors.dategreffe}
                helperText={touched.dategreffe && errors.dategreffe}
                sx={{ gridColumn: 'span 2' }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  contact: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('required'),
  address1: yup.string().required('required'),
  address2: yup.string().required('required'),
});
const initialValues = {
  prenom: '',
  nom: '',
  contact: '',
  address: '',
  gender: '',
  age: '',
  poids: '',
  taille: '',
  corporelle: '',
  imc: '',
};

export default AjoutPatient;
