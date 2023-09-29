import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/patient/all')
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of Patients</h1>
      <ul>
        {patients.map((patient) => (
          <li >
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
