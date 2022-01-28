import { useSpring, animated} from '@react-spring/three'
import React, {useRef, useEffect} from 'react';

// import { useLoader } from "@react-three/fiber";
// import { TextureLoader } from "three/src/loaders/TextureLoader";
// cd
// const name = (type) => `PavingStones092_1K_${type}.jpg`

const GSIplantedSurface =  ({position, args, color, GSIRatio, prevGSIRatios}) => {

    
    
    let prevRatios = prevGSIRatios.current
    
    const mesh = useRef(null);
    useEffect(()=>{
        mesh.current.geometry.translate(0, 0, 3.01)
    },[])
    // let a = (GSIRatio/(GSIRatio+1)).toFixed(2)
    const {GSIScale} = useSpring({

        // GSIScale:[1,1,GSIRatio/(GSIRatio+1)],
        GSIScale: GSIRatio === 2 ? [1,1,1] : [1,1,GSIRatio/(GSIRatio+1)] ,
        // delay: prevRatios[prevRatios.length-2] < GSIRatio ? 2000 : 0 ,
        config:{
            duration:prevRatios[prevRatios.length-2] < GSIRatio ? 2500 :1000
        }
    })

    // const {scaleX, scaleY, scaleZ} = GSIScale;

    // const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
    //     TextureLoader, [
    //         name("Color"),
    //         name("Displacement"),
    //         name("Normal"),
    //         name("Roughness"),
    //         name("AmbientOcclusion")
    //     ] 
    // )
    // colorMap.wrapS = THREE.RepeatWrapping
    // colorMap.wrapT = THREE.RepeatWrapping
    // colorMap.repeat.set(scaleZ,1)
    // displacementMap.repeat.set(1,scaleZ)
    // normalMap.repeat.set(1,scaleZ)
    // roughnessMap.repeat.set(1,scaleZ)
    // aoMap.repeat.set(1,scaleZ)


    return (
        <animated.mesh position={position} ref={mesh} scale={GSIScale}>
            {console.log("hahahahahah prev",prevRatios[prevRatios.length-2])}
            <boxBufferGeometry attach="geometry" args={args}  />
            <meshStandardMaterial attach="material" color={color}
                // displacementScale={0}
                // map={colorMap}
                // displacementMap={displacementMap}
                // normalMap={normalMap}
                // roughnessMap={roughnessMap}
                // aoMap = {aoMap}
            />
        </animated.mesh>
    )
}

export default GSIplantedSurface;
