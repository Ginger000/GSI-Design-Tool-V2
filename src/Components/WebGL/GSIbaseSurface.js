import React, {useRef, useEffect} from 'react';
import { useSpring, animated} from '@react-spring/three'

const GSIbaseSurface = ({position, args, color, GSIratio}) => {
    const mesh = useRef(null);
    useEffect(()=>{
        mesh.current.geometry.translate(0, 0, -3)
    }, [])
    const {hardScale} = useSpring({
        hardScale:GSIratio ===2? [1,1,0] : [1,1,1-GSIratio/(GSIratio+1)],
        config:{
            duration:1000
        }
    })
    return <animated.mesh position={position} ref={mesh} scale={hardScale}>
                <boxBufferGeometry attach="geometry" args={args}  />
                <meshStandardMaterial attach="material" color={color} />
            </animated.mesh>;
};

export default GSIbaseSurface;
