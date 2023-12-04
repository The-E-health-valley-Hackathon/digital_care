import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import QRCode from 'qrcode'
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [id, setid] = useState(null); // State to store selected row ID
  const [openDialog, setOpenDialog] = useState(false);



  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/patient/all');
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (id !== null) {
      setOpenDialog(true); // Show the confirmation dialog
      setid(id); // Store the ID in state to delete if user confirms
    }
  }
  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the confirmation dialog
    setid(null); // Reset the stored ID
  };
   const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/patient/delete/${id}`);
      // Filter out the deleted row from data
      setData(prevData => prevData.filter(row => row.id !== id));
      // Reset selected row ID after deletion
      setid(null);
    } catch (err) {
      console.log(err);
    } finally {
      setOpenDialog(false); // Close the confirmation dialog
    }
  };
  
  const handlePrint = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/patient/one/${id}`);
      const patientData = response.data;
      const doctorResponse = await axios.get(`http://localhost:3000/medcin/one/${patientData.doctors_id}`);
      const doctorData = doctorResponse.data;
  
      const doctorQRData = `${doctorData.nom} ${doctorData.prenom} ${doctorData.numeroDeTelphone}` ;
      const qrCodeDataURL = await QRCode.toDataURL(doctorQRData);
      const qrCodeImage = new Image();
      qrCodeImage.src = qrCodeDataURL; // Set the data URL as the image source

      // Wait for the image to load
      await new Promise(resolve => {
          qrCodeImage.onload = resolve;
      });
      const styles = {
        header: {
            fontSize: 18,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10]
        },
        table: {
            alignment: 'center',
            width: '100%',
        },
        tableHeader: {
            bold: true,
            fontSize: 12,
            fillColor: '#EEEEEE',
            alignment: 'center'
        },
        tableRow: {
            fontSize: 10,
            margin: [0, 5, 0, 5],
            alignment: 'center'
        },
        qrCode: {
          image: qrCodeDataURL, // Set the image source for the QR code
          width: 100,
          alignment: 'center',
          margin: [0, 10, 0, 10]
      }
    };
  
      const tableBody = [
        ['Nom', patientData.nom],
        ['Prénom', patientData.prenom],
        ['Age', patientData.age],
        ['Gender', patientData.gender],
        ['Poids', `${patientData.poids} KG`] ,
        ['Taille', `${patientData.taille} CM` ],
        ['Surace corporelle', patientData.corporelle],
        ['IMC', patientData.imc],
        ['Créatinine plasmatique', patientData.plasmatique],
        ['clairance créatinine', patientData.clairance],
        ['Date de début de conditionnement', patientData.dateAdmission],
        ['Date de la greffe ', patientData.dateprotocole],
        ['Type de greffe ', patientData.typegreffe],




        

        // Add more patient data fields as needed
      ];
      const docDefinition = {
        content: [
            { text: `Docteur: ${doctorData.nom} ${doctorData.prenom}`, style: 'header' },
            { text: `Fiche de Patient - ${patientData.nom} ${patientData.prenom}`, style: 'header' },
            {
                image: styles.qrCode.image, // Use the image source for the QR code
                width: styles.qrCode.width,
                alignment: styles.qrCode.alignment,
                margin: styles.qrCode.margin
            },
            {
                table: {
                    headerRows: 1,
                    widths: ['50%', '50%'],
                    body: [
                        [{ text: 'Attribut', style: 'tableHeader' }, { text: 'Valeur', style: 'tableHeader' }],
                        ...tableBody.map(row => [row[0], row[1]])
                    ]
                },
                style: 'table'
            }
        ],
        styles: {
            header: styles.header,
            table: styles.table,
            tableHeader: styles.tableHeader,
            tableRow: styles.tableRow,
            qrCode: styles.qrCode,

        }
    };
  
      pdfMake.createPdf(docDefinition).open(); // Open the PDF in a new tab
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };
  
  
  
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "nom",
      headerName: "Nom",
      flex: 1,
    },
    {
      field: "prenom",
      headerName: "Prenom",
      flex: 1,
      cellClassName: "prenom-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => (
        <div>

        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(row.id)} // Set selected row ID when button is clicked
        >
          Delete
        </Button>
        <Button variant="contained" color="primary" onClick={() => handlePrint(row.id)}>
          Print
        </Button>
        </div>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box m="40px 0 0 0" height="75vh" sx={{ /* ...styles... */ }}>
        <DataGrid checkboxSelection rows={data} columns={columns} />
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;
