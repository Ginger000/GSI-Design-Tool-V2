import React from 'react'
import DATA from '../Data/newFeedbackSearch_all.json'
const Test = () => {
    const result = DATA.filter(d=>{
        return d["designStorm"] === 2
        && d["duration"] === 2
        && d["soilType"] === 'coarse'
        && d["surface"] === 'planted'
        && d["reliability"] === 1
    })
    console.log("result",result)
    return (
        <div>
            test
        </div>
    )
}

export default Test
