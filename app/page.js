'use client'
import Image from "next/image";
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from "@mui/material";





const backgroundImageStyle = {
  backgroundColor: 'black',
  backgroundPosition: 'center',
  height: '100vh',
  color: 'white',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};


export default function Home() {
  const [text, setText] = useState([]);
  const [result, setResult] = useState([]);
  const onClick = async () => {
    const feinNumbers = text.split(',').map(num => num.trim()).filter(Boolean);
    try {
      const apiResponse = await fetch('https://api-datadashboard.fda.gov/v1/inspections_classifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization-User': process.env.NEXT_PUBLIC_AuthorizationUser,
          'Authorization-Key': process.env.NEXT_PUBLIC_AuthorizationKey,
        },
        body: JSON.stringify({
          "sort": "LegalName",
          "sortorder": "ASC",
          "returntotalcount": true,
          "filters": {
            "FEINumber": feinNumbers,
          },
          "columns": [
            "FEINumber",
            "LegalName",
            "City",
            "State",
            "AddressLine1",
            "AddressLine2"

          ]
        }),
  
      });
      const data = await apiResponse.json();
      setResult(JSON.stringify(data.result, null, 2))
  
      console.log('reponse', data.result);
      console.log(result);
    } catch (error) {
      console.log('error', error)
  
    }
  
  }

  return (
    <Box>
      <Box
        sx={{
          mt: 4,
          mb: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" mb={2}>Enter FEINumber</Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter FEI number and seperate with commas if multiple numbers"
          multiline
          rows={4}
          variant="outlined"
          sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            mb: 2,
            backgroundColor: 'white',
            borderRadius: '10px',
            mb: 2,
            width: '80%'

          }}
        ></TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
          sx={{
            borderRadius: '10px',
            border: '2px solid white',
            color: 'black',
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)'
            },            
            width: '40%'

          }}


        >{' '}Submit</Button>
      </Box>
      <Box
      sx={{
        mt: 4,
          mb: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
      }}>
        <pre>{result}</pre>
      </Box>
    </Box>
  );
}