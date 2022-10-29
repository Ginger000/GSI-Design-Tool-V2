function LegendBar({ title }) {
    const colorSpecs = {
        Subsurface: '#d4a7a4',
        Surface: '#84879c',
        'Proposed GSI Type – Bioretention': '#375623',
        'Proposed GSI Type – Permeable Pavement': '#3c8335',
        'Proposed GSI Depth': '#ffe07d',
    };
    return (
        <div>
            <label htmlFor="">{`${title}`}</label>
            <div
                style={{
                    backgroundColor: `${colorSpecs[title]}`,
                    height: '7px',
                    width: '60px',
                }}
            ></div>
        </div>
    );
}

export default LegendBar;
