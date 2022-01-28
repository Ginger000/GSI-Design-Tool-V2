import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const columns = [
  { field: 'designStorm', headerName: 'Design Strom (inches)', width: 180 },
  { 
    field: 'reliabtility', headerName: 'Reliabtility', width: 130,
    valueGetter:()=>1
  },
  { field: 'depth', headerName: 'Depth', width: 130},
  { field: 'loadingRatio', headerName: 'Loading Ratio', width: 130,
    valueGetter:(params)=> params.value === 2 ? params.value = 'Direct Infiltration' : params.value

  },
  { field: 'duration', headerName: 'Duration (hrs)', width: 130},
  { field: 'soilType', headerName: 'Soil Type', width: 130},
  { field: 'surface', headerName: 'Surface Type', width: 130},
]




const FeedbackScenariosDataGrid = ({feedbackScenarios}) => {
  
  const rows = feedbackScenarios
  return (
    <>
    <br />
    <Typography variant="subtitle2" gutterBottom component={'span'}>
    As you adjust GSI-depth or GSI-loading-ratio, the highest design storm the GSI could also be decreased or increased.
    <br/>
    We call it a feedback relation because the change of your output parameter would also affect your input parameter.
    <br/>
    All feedback scenarios are print out in the data table below. 

    </Typography>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
 
      />
    </div>
    </>
  );
};

export default FeedbackScenariosDataGrid;
