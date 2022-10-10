function LegendBar({ title }) {
    const colorSpecs = {
        'Existing Site': '#D7B7BD',
        'Impermeable Hard Pavement': '#858585',
        'GSI Type - Bioretention': '#008B14',
        'GSI Type - Permeable Pavement': '#BC4A3C',
        'GSI Depth': '#ECE957',
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
