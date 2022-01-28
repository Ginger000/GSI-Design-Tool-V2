import React, {useState, useEffect, Suspense, useRef} from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useMediaQuery from '@mui/material/useMediaQuery';
import DATA from "../Data/newFeedbackSearch_all_setDirectInfiltrationAs2.json"
import Grid from '@mui/material/Grid';
import { Canvas} from "@react-three/fiber";
import {OrthographicCamera, OrbitControls} from '@react-three/drei'
import GSIbase from './WebGL/GSIbase';
import GSIbaseSurface from './WebGL/GSIbaseSurface';
import GSIplantedSurface from './WebGL/GSIplantedSurface';
import GSIdepth from './WebGL/GSIdepth';
import ScenarioDataGrid from './ScenarioDataGrid';
import FeedbackScenariosDataGrid from './FeedbackScenariosDataGrid';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={'span'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const OutputPanel = ({initialDepth, initialRatio, surface, scenarios, handleSetFeedbackScenarios, duration,soilType, surfaceType, isStormRecommend, stormRecommend, feedbackScenarios}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [depth, setDepth] = useState(initialDepth)
    //used in console radio button
    const handleChangeTogether = (input1, input2)=>{
        setDepth(input1)
        setLoadingRatio(input2)
    }
    //used in output radio button
    const changeDepth = e => {
        let newDepth = Number.parseInt(e.target.value)
        //check whether newDepth is out of bound
        if(newDepth < depthBound[0]) {
            setDepth(depthBound[0])
            setDepthWarning(true)
        } else {
            setDepth(newDepth)
            setDepthWarning(false)
        } 
    } 
    const [loadingRatio, setLoadingRatio] = useState(initialRatio);
    const prevLoadingRatios = useRef([])
    const changeRatio = e => {
        let newRatio = Number.parseFloat(e.target.value)
        //check the whether newRatio is out of bound
        if(newRatio < ratioBound[0]){
            setLoadingRatio(ratioBound[0])
            setRatioWarning(true)
        } else {
            setLoadingRatio(newRatio)
            setRatioWarning(false)
        }
    } 
    const [depthWarning, setDepthWarning] = useState(false)
    const [ratioWarning, setRatioWarning] = useState(false)
    const [depthBound, setDepthBound] = useState([0])
    const [ratioBound, setRatioBound] = useState([0])

    const generateFeedbackScenarios = ()=>{
        if(scenarios) {
            handleSetFeedbackScenarios(()=>{
                const result = DATA.filter(d=>{
                    return d["depth"] === depth 
                    && d["loadingRatio"] === loadingRatio
                    && d["reliability"] === 1 
                    && d["soilType"] === soilType
                    && d["duration"] === duration 
                    && d["surface"] === surfaceType
                    })
                result.sort((a,b)=>b["designStorm"]-a["designStorm"])
                return result
            })  
        }
        
    }

    //re-initiate output panel everytime GENERATE button is pressed
    //pass scenarios here is for reset output everytime click generate
    useEffect(()=>{
        setDepth(initialDepth)
        setLoadingRatio(initialRatio)
    },[initialDepth, initialRatio, scenarios])

    //get the new bound of laodingRatio
    //withdraw the warning is the current loadingRatio is within the new bound
    useEffect(()=>{
        getBound(depth, "depth", "loadingRatio")  
        if(loadingRatio >= ratioBound[0]) setRatioWarning(false)
        //get design storm bound and display recommendation
        //from the ux perspective, the display INFO would suggest users to play with design storm
        generateFeedbackScenarios()
        isStormRecommend()
    },[depth])

    //get the bound of depth
    useEffect(()=>{
        getBound(loadingRatio, "loadingRatio", "depth")
        if(depth >= depthBound[0]) setDepthWarning(false)
        //get design storm bound and display recommendation
        generateFeedbackScenarios()
        prevLoadingRatios.current.push(loadingRatio)
        
    }, [loadingRatio])
    
    //get the bound of controlled
    const getBound = (changed, changedStr, controlledStr) => {
        let tempBound = []
        //we can use binary search and insert if scenarios is a large collection
        for(let s of scenarios){
            if(s[changedStr] === changed){
                tempBound.push(s[controlledStr])
            }
        }
        tempBound.sort((a,b)=>a-b)
        if(changedStr ==="depth") {
            setRatioBound(tempBound)
        } 
        else if(changedStr === "loadingRatio") setDepthBound(tempBound)
    }

    const depthUnit = {
        12:1,
        18:1.5,
        24:2,
        30:2.5
    }

    const matches = useMediaQuery('(min-width:600px)')
    return (
        <>
        <Grid container spacing={2}>
            <Grid item height={500} xs={12} md = {12} lg={12}>
                <Canvas colorManagement>
                <Suspense fallback={null}>
                    <OrthographicCamera makeDefault position={[10, 3, -3.5]} zoom={matches? 60 : 40} />
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[-8, 8, -5]} castShadow intensity={1} shadow-camera-far={70} />
                    {/* <axesHelper args={[10]} /> */}
                    <group position={[0, 0, 3]}>
                        <GSIdepth position={[0,1.5,-6.01]} args={[4.001,2.501,6.005]} GSIRatio={loadingRatio} depth={depthUnit[depth]} color='yellow' prevGSIRatios={prevLoadingRatios}/>
                        <GSIplantedSurface position={[0,1.65,-6]} args={[4.002,0.3,6.01]} GSIRatio={loadingRatio} color={surfaceType === "planted" ? 'green': "lightblue"} prevGSIRatios={prevLoadingRatios} />
                        <GSIbaseSurface position={[0,1.65,0]} GSIratio={loadingRatio} args={[4.01,0.31,6.01]} color='lightgrey'  />
                        <GSIbase position={[0,0,0]} args={[4,3,6]} color='pink' />
                    </group>
                    <OrbitControls makeDefault />
                    </Suspense>
                </Canvas>
            </Grid>

            <Grid item xs={12} md = {12} lg={12}>
                {scenarios? 
                    <Stack>
                        {stormRecommend && feedbackScenarios ? 
                        [
                            matches ? '':
                            <Alert variant="outlined" severity="info" > 
                                You could adjust the design storm within the range {" "}
                            {feedbackScenarios[feedbackScenarios.length-1]["designStorm"]} inches to {" "}
                            {feedbackScenarios[0]["designStorm"]} inches  
                            </Alert>
                        ] : ''
                        }
                        <br />
                        {console.log("depthBound", depthBound, "ratioBound", ratioBound, "previousRatio", prevLoadingRatios, "currentRatio", loadingRatio)}
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Depth (inches)</FormLabel>
                            {depthWarning ? 
                                <Alert variant="outlined" severity="warning" > 
                                    The depth cannot be smaller than {depthBound[0]} inches in terms of your inputs and current loading ratio 
                                </Alert> :
                                ""
                            }
                            <RadioGroup value={depth} onChange={changeDepth} row aria-label="depth" name="row-radio-buttons-group">
                                <FormControlLabel value={12} control={<Radio />} label="12" />
                                <FormControlLabel value={18} control={<Radio />} label="18" />
                                <FormControlLabel value={24} control={<Radio />} label="24" />
                                <FormControlLabel value={30} control={<Radio />} label="30" />
                            </RadioGroup>
                        </FormControl>
                        
                        {surface === "planted" ?
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Loading Ratio</FormLabel>
                                {ratioWarning ? 
                                    <Alert variant="outlined" severity="warning" > 
                                        The loading ratio cannot be smaller than {ratioBound[0]} in terms of your inputs and current GSI depth
                                    </Alert> :
                                    ""
                                }
                                <RadioGroup value={loadingRatio} onChange={changeRatio} row aria-label="loading ratio" name="row-radio-buttons-group">
                                    <FormControlLabel value={0.2} control={<Radio />} label="1:5" />
                                    <FormControlLabel value={0.33} control={<Radio />} label="1:3" />
                                    <FormControlLabel value={0.5} control={<Radio />} label="1:2" />
                                    <FormControlLabel disabled value={1} control={<Radio />} label="1:1" />
                                    <FormControlLabel disabled value={0} control={<Radio />} label="Direct Infiltration" />
                                </RadioGroup>
                            </FormControl> : 
                            <FormControl component="fieldset">
                            <FormLabel component="legend">Loading Ratio</FormLabel>
                                {ratioWarning ? 
                                    <Alert variant="outlined" severity="warning" > 
                                        The loading ratio only can be direct infiltration in terms of your inputs and current GSI depth
                                    </Alert> :
                                    ""
                                }
                                <RadioGroup value={loadingRatio} onChange={changeRatio} row aria-label="loading ratio" name="row-radio-buttons-group">
                                    <FormControlLabel disabled value={0.2} control={<Radio />} label="1:5" />
                                    <FormControlLabel disabled value={0.33} control={<Radio />} label="1:3" />
                                    <FormControlLabel disabled value={0.5} control={<Radio />} label="1:2" />
                                    <FormControlLabel value={1} control={<Radio />} label="1:1" />
                                    <FormControlLabel value={2} control={<Radio />} label="Direct Infiltration" />
                                </RadioGroup>
                            </FormControl>
                        }        
                    </Stack>
                    : ''
                }
            </Grid>
    
        </Grid>
        <br />
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Instruction" {...a11yProps(0)} />
              <Tab label="Theory" {...a11yProps(1)} />
              <Tab label="Console" {...a11yProps(2)} />
              <Tab label="Credit" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {matches ? '1, ' : '1, Click the menu on the left-top corner '}
            Select your site condition on the left input panel
            <br />
            2, Click <Button variant="contained" size="small">GENERATE</Button>  button in the left input panel to get the recommended GSI prototype on the right output panel. 
            (This protype is the one with lowest cost and fits your site conditions )
            <br />
            3, GSI-loading-ratio options and GSI-depth options would pop up as the same time your GSI prototype is generated. 
            You're encouraged to adjust the ratio and depth. This tool would <Alert sx={{display:"inline-flex", pt:0, pb:0}}  variant="outlined" severity="warning"> give you warnings </Alert> if the ratio or depth not fits your site conditions.
            <br />
            4, Everytime you adjust the ratio or depth, the maximum design storm you could reach to would also be changed. This tool would <Alert sx={{display:"inline-flex", pt:0, pb:0}} variant="outlined" severity="info"> give you the recommended range of possible design storm</Alert>.
            <br />
            5, The 3d geometric visualiation sould help out intuitively understand the changes and relations among site, soil, and surface. The animations shows how the impemeable hard pavement is supposed to be depaved first and then the GSI is add.
            <br />
            6, And you and zoom in/out or rotate the geometry by your mouse. Press mouse left button to rotate, press mouse right button to move.
            <br />
            7, Go to the THEORY tab to learn about the scientific research behind this tool
            <br />
            8, Go to the CONSOLE tab to take a look at the lab experiment data that fits your current input site conditions and fits your generated GSI prototype
            <br />
            9, You could skip playing with the generated prototypes, and get all sorted GSI prototypes that fits your input immediately.
          </TabPanel>
          <TabPanel value={value} index={1}>
            1, What is reliability curve?
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
            <br />
            <br />
            2, How this GSI Design Tool works?
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
          </TabPanel>
          <TabPanel value={value} index={2}>
            {scenarios ? <ScenarioDataGrid scenarios={scenarios} depth={depth} loadingRatio={loadingRatio} changeTogether={handleChangeTogether} /> : " "}
            {feedbackScenarios? <FeedbackScenariosDataGrid feedbackScenarios={feedbackScenarios} /> : '' }
            {/* <ScenarioDataGrid scenarios={scenarios} /> */}
            
          </TabPanel>
          <TabPanel value={value} index={3}>
            @ WATER LAB 2022
          </TabPanel>
        </Box>
        </>
    )
}

export default OutputPanel
