import React, {useEffect, useRef} from 'react';

const GSIbase = ({position, args, color}) => {
    const mesh = useRef(null);
    useEffect(()=>{
        mesh.current.geometry.translate(0, 0, -3)
    },[])
    return <mesh position={position} ref={mesh}>
        <boxBufferGeometry attach="geometry" args={args}  />
        <meshStandardMaterial attach="material" color={color} />
    </mesh>
};

export default GSIbase;
