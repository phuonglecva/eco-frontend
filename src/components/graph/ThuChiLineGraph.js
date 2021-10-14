import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';
import axios from 'axios';
import { Select } from 'antd';
import BaseBarGraph from './StatisticBarGraph/BarBaseGraph';
import BaseLineGraph from './LineGraph/BaseLineGraph';
import '../css/LineGraph.css';
import CanvasDemo from './Canvas/CanvasDemo';

const ThuChiLineGraph = (props) => {
    const [thu, setThu] = useState(Array.from({ length: 30 }, (x, i) => ({ year: 2000 + i, value: Math.random() })))
    const thuTitle = 'thu ngân sách'
    const chiTitle = 'chi ngân sách'
    const [thuConfig, setThuConfig] = useState({
        data: thu,
        height: 300,
        xField: 'month',
        yField: 'value',
        seriesField: 'cat',
        xAxis: {},
        yAxis: {
            label: {
                formatter: function formatter(v) {
                    return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
                        return ''.concat(s, ',');
                    });
                },
            },
        },
        xAxis: {
            nice: true,
            grid: {
                line: {
                    style: {
                        stroke: '#ddd',
                        lineDash: [4, 2],
                    },
                },
                alternateColor: 'rgba(0,0,0,0.05)',
            },
            title: {
                text: "Tháng",
                style: { fontSize: 16 },
            }

        },
        yAxis: {
            grid: {
                line: {
                    style: {
                        stroke: '#ddd',
                        lineDash: [4, 2],
                    },
                },
                alternateColor: 'rgba(0,0,0,0.05)',
            },
            title: {
                text: 'Giá trị (tỷ đồng)',
                style: { fontSize: 16 },
            },
        },
        label: false,
        slider: {},
        point: {
            size: 3,
            shape: 'diamond',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2,
            },
            shape: function shape(item) {
                if (item.category === 'thu ngân sách') {
                    return 'circle';
                }
                return 'diamond';
            },
        },
        legend: {
            position: 'top-right',
            itemName: {
                style: { fill: '#000' },
                formatter: function formatter(name) {
                    return name;
                },
            },
        },
        barData: {
            timeline: [],
            data: []
        },
        title: props.title
    })

    let [responseData, setResponseData] = React.useState('');
    const fetchData = React.useCallback(() => {
        axios({
            "method": "GET",
            // "url": "https://aic-group.bike/api/v1/dong-nai/thuchi",
            "url": `${process.env.REACT_APP_API_URL}/thuchi`,
            "headers": {
                "content-type": "application/json",
            }, "params": {
                "language_code": "en"
            }
        })
            .then((response) => {
                setResponseData(response.data)
                let { timeline, thuchi_data } = response.data.data
                const thu_data = thuchi_data[0].value[0].value.reverse()
                const chi_data = thuchi_data[1].value[0].value.reverse()
                timeline = timeline.reverse()

                let data = []
                thu_data.forEach((value, i) => {
                    data.push({
                        month: timeline[i],
                        value: value,
                        cat: thuTitle
                    })
                })
                chi_data.forEach((value, i) => {
                    data.push({
                        month: timeline[i],
                        value: value,
                        cat: chiTitle
                    })
                })
                setThu(data)
                let barData = {
                    timeline,
                    data: [thuTitle, chiTitle].map((title, idx) => ({
                        name: title,
                        data: data.filter((val) => val.cat === title).map((val) => val.value)
                    }))
                }
                setThuConfig({ ...thuConfig, data, barData })

            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    React.useEffect(() => {
        fetchData()
    }, [fetchData])

    const [graphType, setGraphType] = useState("bar")
    return (
        <div style={{ width: "100%", textAlign: "center" }}>
            <h2 style={{ color: "#34568B", marginTop: "20px", fontFamily: 'Georgia, Times, "Times New Roman", self-serif', textTransform: "uppercase", fontWeight: "bolder" }}>Thu chi ngân sách</h2>

            <div className="graph-area">
                <Select defaultValue={graphType} onChange={setGraphType} style={{ float: "right", margin: "5px" }}>
                    <Select value="line">Biểu đồ đường</Select>
                    <Select value="bar">Biểu đồ cột</Select>
                </Select>

                <div style={{ clear: "both" }}>
                    {/* {(graphType === 'line') && <BaseLineGraph {...thuConfig} />} */}
                    {/* {(graphType === 'bar') && <BaseBarGraph {...thuConfig} />} */}
                    <div className="line-graph">
                        {(graphType === 'line') && <Line {...thuConfig} />}
                        {(graphType === 'bar') && <CanvasDemo {...thuConfig} />}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default ThuChiLineGraph;