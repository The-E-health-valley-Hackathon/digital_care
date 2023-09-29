import { Box, Typography, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [id, setid] = useState(null); // State to store selected row ID

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
      try {
        await axios.delete(`http://localhost:3000/patient/delete/${id}`);
        // Filter out the deleted row from data
        setData(prevData => prevData.filter(row => row.id !== id));
        // Reset selected row ID after deletion
        setid(null);
      } catch (err) {
        console.log(err);
      }
    }
  }

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
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(row.id)} // Set selected row ID when button is clicked
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box m="40px 0 0 0" height="75vh" sx={{ /* ...styles... */ }}>
        <DataGrid checkboxSelection rows={data} columns={columns} />
        
      </Box>
    </Box>
  );
};

export default Team;
