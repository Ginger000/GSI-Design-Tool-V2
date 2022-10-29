import React, { useState, useEffect, useRef } from 'react';
import InputPanel from './Components/InputPanel';
import OutputPanel from './Components/OutputPanel';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { DataGrid } from '@mui/x-data-grid';
import Radio from '@mui/material/Radio';
import Grid from '@mui/material/Grid';
import Test from './Components/Test';
import useMediaQuery from '@mui/material/useMediaQuery';

import CustomTheme from './Assets/CustomTheme';
import { ThemeProvider } from '@mui/material';

function App(props) {
    const matches = useMediaQuery('(min-width:600px)');
    const drawerWidth = matches ? 500 : 350;

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() =>
        console.log(
            'scenarios',
            scenarios,
            'feedbackScenarios',
            feedbackScenarios
        )
    );
    //get Scenarios from inputPanel and use it in outputPanel
    const [scenarios, setScenarios] = useState(null);
    //get feedbackScenarios from output and use it in inputPanel
    const [feedbackScenarios, setFeedbackScenarios] = useState(null);
    const [duration, setDuration] = useState(null);
    const [soilType, setSoilType] = useState(null);
    const [surfaceType, setSurfaceType] = useState(null);
    const [stormRecommend, isStormRecommend] = useState(false);
    const [displayedGraphic, setDisplayedGraphic] = useState([
        'Surface',
        'Subsurface',
    ]);

    //change the displayed lengend as the output change with planted or paved surface
    useEffect(() => {
        if (scenarios) {
            const surface =
                scenarios[0].surface === 'planted'
                    ? 'Proposed GSI Type – Bioretention'
                    : 'Proposed GSI Type – Permeable Pavement';
            setDisplayedGraphic(() => [
                'Surface',
                'Subsurface',

                `${surface}`,
                'Proposed GSI Depth',
            ]);
        }
    }, [scenarios]);

    const handleIsStormRecommend = () => {
        isStormRecommend(true);
    };
    const handleSetSurfaceType = (input) => {
        setSurfaceType(input);
    };
    const handleSetSoilType = (input) => {
        setSoilType(input);
    };
    const handleSetDuration = (input) => {
        setDuration(input);
    };
    const handleSetScenarios = (result) => {
        setScenarios(result);
    };
    const handleSetFeedbackScenarios = (result) => {
        setFeedbackScenarios(result);
    };

    const drawer = (
        <InputPanel
            handleSetScenarios={handleSetScenarios}
            duration={duration}
            setDuration={handleSetDuration}
            soilType={soilType}
            setSoilType={handleSetSoilType}
            surfaceType={surfaceType}
            setSurfaceType={handleSetSurfaceType}
            feedbackScenarios={feedbackScenarios}
            stormRecommend={stormRecommend}
        />
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    // const ref = useRef(null)
    // useEffect(() => {
    //   console.log('width', ref.current ? ref.current.offsetWidth : 0);
    // }, [ref.current]);

    return (
        <ThemeProvider theme={CustomTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component={'span'}>
                            GSI Design Tool
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                            },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}
                >
                    <Toolbar />
                    <OutputPanel
                        // ref={ref}
                        initialDepth={scenarios ? scenarios[0].depth : ''}
                        initialRatio={
                            scenarios ? scenarios[0].loadingRatio : ''
                        }
                        surface={scenarios ? scenarios[0].surface : ''}
                        scenarios={scenarios ? scenarios : ''}
                        handleSetFeedbackScenarios={
                            scenarios ? handleSetFeedbackScenarios : ''
                        }
                        duration={duration}
                        soilType={soilType}
                        surfaceType={surfaceType}
                        isStormRecommend={handleIsStormRecommend}
                        feedbackScenarios={feedbackScenarios}
                        stormRecommend={stormRecommend}
                        displayedGraphic={displayedGraphic}
                    />
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
