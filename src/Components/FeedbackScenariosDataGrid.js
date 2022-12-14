import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const columns = [
    { field: 'designStorm', headerName: 'Design Storm (inches)', width: 230 },
    // {
    //     field: 'reliabtility',
    //     headerName: 'Reliability',
    //     width: 180,
    //     valueGetter: () => 1,
    // },
    { field: 'depth', headerName: 'Depth', width: 130 },
    {
        field: 'loadingRatio',
        headerName: 'Loading Ratio',
        width: 180,
        valueGetter: (params) =>
            params.value === 2
                ? (params.value = 'Direct Infiltration')
                : params.value,
    },
    { field: 'duration', headerName: 'Duration (hrs)', width: 180 },
    { field: 'soilType', headerName: 'Soil Type', width: 180 },
    {
        field: 'surface',
        headerName: 'Surface Type (GSI Type)',
        width: 180,
        valueGetter: (params) =>
            params.value === 'planted' ? 'bioretention' : 'permeable pavement',
    },
];

const FeedbackScenariosDataGrid = ({ feedbackScenarios }) => {
    const rows = feedbackScenarios;
    return (
        <>
            <br />
            <h2 style={{ color: 'grey' }}>Table-2 Feedback Scenarios</h2>
            <Typography variants="body2">
                *Reliability is set at 100% probability of reducing stormwater
                runoff by the specified performance standard.
            </Typography>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    disableSelectionOnClick
                    sx={{
                        fontSize: '1.1rem',
                        '& .super-app-theme--header': {
                            fontWeight: 700,
                        },
                    }}
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
