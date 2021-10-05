import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';
import axios from 'axios'
import Demo from './BarGraph.js/Demo';
import { ENOMEM } from 'constants';
import {Select} from 'antd';
import DemoPie from './PieGraph/PieDemo';
import '../css/LineGraph.css';
const UnEmpLineGraph = (props) => {
    const [barName, setBarName] = useState('')
    const [data, setData] = useState([])
    const [timeline, setTimeline] = useState([])
    const [graphType, setGraphType] = useState("bar")

    const fetchData = React.useCallback(() => {
        axios({
            "method": "GET",
            "url": "https://aic-group.bike/api/v1/dong-nai/unemployment",
            "headers": {
                "content-type": "application/json",
            }, "params": {
                "language_code": "en"
            }
        })
            .then((response) => {
                const { timeline, unemployment } = response.data.data
                setTimeline(timeline)
                console.log("Timeline, UnEmp:", timeline, unemployment)

                let unEmpData = []
                for (let unEmmType of unemployment) {
                    const typeName = unEmmType.index_name
                    const values = unEmmType.value

                    let valueWithType = []
                    let regions = ["Tổng số", "Thành thị", "Nông thôn"]
                    values.forEach((region, i) => {
                        let regionName = region.region
                        let value = region.value
                        regionName = regions[i]
                        valueWithType.push({
                            // regions,
                            regionName,
                            value
                        })
                    })
                    unEmpData.push({
                        typeName,
                        values: valueWithType
                    })
                }
                
                setData(unEmpData)
                console.log("Type", unEmpData)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    React.useEffect(() => {
        fetchData()
    }, [])
    const Graph = (graphType == "bar") ? Demo: DemoPie;

    return (
        <div style={{ width: "100%", textAlign: "center" }}>
            <div className="graph-area" style={{marginBottom:"10px"}}>
            {/* <div style={{
                // border: "1px double gray",
                padding: "20px",
                borderRadius: "20px",
                display: "inline-block",
                width: "100%",
            }}> */}
                <Select defaultValue="bar" style={{float:"right", margin:"5px"}} onChange={(value)=>{
                    setGraphType(value)
                }}>
                    <Select value="bar">Biểu đồ cột</Select>
                    <Select value="pie">Biểu đồ bánh</Select>
                </Select>
                <h2 style={{ color: "black", paddingLeft:"100px", marginBottom:"20px" }}><u>{props.title}</u></h2>
                {data.map((value) => {
                    return (
                        <div style={{textAlign:"center"}}>
                            <h3 style={{ clear:"both", marginBottom:"50px"}}>{value.typeName}</h3>
                            <div style={{marginBottom:"20px"}}>
                                {value.values.map((val) => {
                                    return <Graph title={val.regionName} data={val.value} timeline={timeline}/>
                                })}
                                <hr style={{width:"50%", clear:"both", textAlign:"center", display:"block", opacity:"0.5"}}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
};
export default UnEmpLineGraph;