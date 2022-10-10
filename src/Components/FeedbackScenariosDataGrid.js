import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const columns = [
    { field: 'designStorm', headerName: 'Design Strom (inches)', width: 180 },
    {
        field: 'reliabtility',
        headerName: 'Reliabtility',
        width: 130,
        valueGetter: () => 1,
    },
    { field: 'depth', headerName: 'Depth', width: 130 },
    {
        field: 'loadingRatio',
        headerName: 'Loading Ratio',
        width: 130,
        valueGetter: (params) =>
            params.value === 2
                ? (params.value = 'Direct Infiltration')
                : params.value,
    },
    { field: 'duration', headerName: 'Duration (hrs)', width: 130 },
    { field: 'soilType', headerName: 'Soil Type', width: 130 },
    { field: 'surface', headerName: 'Surface Type', width: 130 },
];

const FeedbackScenariosDataGrid = ({ feedbackScenarios }) => {
    const rows = feedbackScenarios;
    return (
        <>
            <br />
            <h2 style={{ color: 'grey' }}>Table-2 Feedback Scenarios</h2>
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
