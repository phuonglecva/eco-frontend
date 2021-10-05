import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Radio } from 'antd';


const BaseBarGraph = (props) => {
    // const timeline = props.barData.map((value) => value.time)
    // const data = props.barData.map((value) => value.value)
    const { barData } = props
    const [showNum, setShowNum] = useState(6)
    const state = {
        options: {
            grid: {
                show: true
            },
            plotOptions: {
                bar: {
                    horizontal: false
                }
            },
            chart: {
                id: "tháng",
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 500,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 500
                    }
                }
            },
            xaxis: {
                categories: barData.timeline.slice(-showNum),
                title: {
                    text: props.xAxis.title.text,
                    style: {
                        fontSize: 15
                    }
                }
            },
            yaxis: {
                title: {
                    text: props.yAxis.title.text,
                    style: {
                        fontSize: 15
                    }
                }
            },
            title: {
                text: props.title,
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: undefined,
                    fontSize: '20px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-title',
                },
                align: "center"
            },
            dataLabels: {
                style: {
                    fontSize: '10px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                },
            },
            colors: [function (value) {
                // console.log("Value: ", value)
                const seriesIndex = value.seriesIndex

                if (value.value < 0) {
                    return (seriesIndex == 0) ? '#f2003c' : '#7f1734'
                } else {
                    return (seriesIndex == 0) ? '#8a3ab9' : '#0072b1'
                }
            }],


        },
        // series: [
        //     {
        //         name: "dữ liệu cpi",
        //         // data: [30, 40, 45, 50, 49, 60, 70, 91]
        //         data: data.slice(20,)
        //     },
        // ],
        series: barData.data.map((val, idx) => ({
            ...val, data: val.data.slice(-showNum,)
        })),

    };
    return (
        <div style={{width:"100%"}}>
            <Chart
                options={state.options}
                series={state.series}
                type="bar"
                height="330vh"
                width="auto"
            // width="500"
            />
            <div>
                <Radio.Group onChange={(e) => setShowNum(e.target.value)} value={showNum}>
                    <Radio value={3}>3 Tháng</Radio>
                    <Radio value={6}>6 Tháng</Radio>
                    <Radio value={9}>9 Tháng</Radio>
                    <Radio value={12}>12 Tháng</Radio>
                    <Radio value={"all"}>All</Radio>
                </Radio.Group>
            </div>
        </div>
    )
}

export default BaseBarGraph;