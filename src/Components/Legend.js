import LegendBar from './LegendBar';

export default function Legend({ displayedGraphic }) {
    const legends = displayedGraphic.map((item, idx) => {
        //console.log(item);
        return <LegendBar key={idx} title={item} />;
    });
    return <div style={{ position: 'absolute' }}>{legends}</div>;
}
