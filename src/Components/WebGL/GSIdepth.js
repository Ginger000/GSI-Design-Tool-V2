import { useSpring, animated} from '@react-spring/three'
import React, { useRef, useEffect} from 'react';


const GSIdepth = ({position, args, color, GSIRatio, prevGSIRatios, depth}) => {
    let prevRatios = prevGSIRatios.current
    const mesh = useRef(null);
    useEffect(()=>{
        mesh.current.geometry.translate(0, -1.25, 3.01)
    },[])

    const {GSISoilScale} = useSpring({
        
        // GSISoilScale:[1,1,GSIRatio/(GSIRatio+1)],
        GSISoilScale:GSIRatio ===2? [1,depth/2.5,1] : [1,depth/2.5,GSIRatio/(GSIRatio+1)],
        // delay:prevGSIRatio < GSIRatio ? 2000 : 0 ,
        // delay:2000,
        config:{
            duration:prevRatios[prevRatios.length-2] < GSIRatio ? 2500 :1000
        }
    })
    return (
        <animated.mesh position={position} ref={mesh} scale={GSISoilScale}>
            <boxBufferGeometry attach="geometry" args={args}  />
            <meshStandardMaterial attach="material" color={color} />
        </animated.mesh>
    )
}

export default GSIdepth;
