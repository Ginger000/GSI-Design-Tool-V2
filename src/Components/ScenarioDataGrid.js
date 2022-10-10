import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ScenarioDataGrid = ({
    scenarios,
    depth,
    loadingRatio,
    // setDepth,
    // setLoadingRatio,
    changeTogether,
}) => {
    const rows = scenarios;
    let radioChecked = [rows[0].id];
    const columns = [
        {
            field: 'radiobutton',
            headerName: '',
            width: 100,
            sortable: false,
            // renderCell: (params) => (
            //     <Radio
            //         checked={radioChecked[0] === params.id}
            //         value={params.id}
            //     />
            // ),
        },
        // {
        //   field:"id",
        //   headerName:"ID"
        // },
        {
            field: 'loadingRatio',
            headerName: 'Loading Ratio',
            width: 180,
            headerClassName: 'super-app-theme--header',
            valueGetter: (params) =>
                params.value === 2
                    ? (params.value = 'Direct Infiltration')
                    : params.value,
        },
        {
            field: 'depth',
            headerClassName: 'super-app-theme--header',

            headerName: 'Depth (inches)',
            width: 180,
        },
    ];

    const [selectionModel, setSelectionModel] = useState(radioChecked);
    radioChecked = selectionModel;

    // To reset intial radio button check when has new scenarios
    // useEffect(() => {
    //   setSelectionModel([scenarios[0].id])
    // }, [scenarios]);

    useEffect(() => {
        // setSelectionModel([scenarios[1].id])
        if (scenarios.length && depth && loadingRatio) {
            setSelectionModel([
                scenarios.filter(
                    (s) =>
                        s['depth'] === depth &&
                        s['loadingRatio'] === loadingRatio
                )[0].id,
            ]);
        }
    }, [depth, loadingRatio]);

    let selectedRow;
    if (rows) {
        selectedRow = rows.filter((item) => {
            return item.id === selectionModel[0];
        });
        // if(selectedRow.length){
        //   changeTogether(selectedRow[0].loadingRatio, selectedRow[0].depth)
        // }
        // selectedRow[0] && setDepth(selectedRow[0].depth);
        // selectedRow[0] && setLoadingRatio(selectedRow[0].loadingRatio);

        console.log('selectedRow', selectedRow);
    }

    return (
        <Typography component="div">
            <br />
            <h2 style={{ color: 'grey' }}>Table-1 Scenarios</h2>

            <>
                <DataGrid
                    sx={{
                        fontSize: '1.1rem',
                        '& .super-app-theme--header': {
                            fontWeight: 700,
                        },
                    }}
                    rows={rows}
                    columns={columns}
                    autoHeight
                    selectionModel={selectionModel}
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                    }}
                />
                {/* <div style={{ marginTop: "40px" }}>
        {selectedRow.length ? `You have selected: ${selectedRow[0].loadingRatio} ${selectedRow[0].depth}` : " "}
        
        
      </div> */}
            </>
        </Typography>
    );
};

export default ScenarioDataGrid;
